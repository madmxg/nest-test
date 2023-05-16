import { Injectable } from '@nestjs/common'
import { Observable, forkJoin, map, shareReplay } from 'rxjs'

import {
	SkinportItemDto,
	SkinportItemReadDto,
} from '../../common/clients/skinport-client/dto'
import { DatabasePool } from '../../common/modules/database/database-pool.provider'
import { CacheContainerService } from '../../common/modules/cache-container/cache-container.service'
import { SkinportClientService } from '../../common/clients/skinport-client/skinport-client.service'

const TRADABLE_KEY = 'TRADABLE_KEY'
const UNTRADABLE_KEY = 'UNTRADABLE_KEY'

type SkinportItemExtended = SkinportItemDto & { min_price_tradable?: number }

@Injectable()
export class ItemsService {
	constructor(
		private readonly skinportClientService: SkinportClientService,
		private readonly cacheContainerService: CacheContainerService,
		private readonly databasePool: DatabasePool,
	) {}

	public readItems() {
		const tradableCachedItems$ = this.cacheContainerService.get(
			TRADABLE_KEY,
		) as Observable<SkinportItemReadDto> | undefined
		const untradableCachedItems$ = this.cacheContainerService.get(
			UNTRADABLE_KEY,
		) as Observable<SkinportItemReadDto> | undefined

		let tradableItems$: Observable<SkinportItemReadDto>
		if (typeof tradableCachedItems$ !== 'undefined') {
			tradableItems$ = tradableCachedItems$
		} else {
			tradableItems$ = this.skinportClientService
				.readItems(true)
				.pipe(shareReplay(1))
			this.cacheContainerService.put(TRADABLE_KEY, tradableItems$)
		}

		let untradableItems$: Observable<SkinportItemReadDto>
		if (typeof untradableCachedItems$ !== 'undefined') {
			untradableItems$ = untradableCachedItems$
		} else {
			untradableItems$ = this.skinportClientService
				.readItems(false)
				.pipe(shareReplay(1))
			this.cacheContainerService.put(UNTRADABLE_KEY, untradableItems$)
		}

		return forkJoin({
			tradableItems: tradableItems$,
			untradableItems: untradableItems$,
		}).pipe(
			map(({ tradableItems, untradableItems }) => {
				const itemsMap = new Map<string, SkinportItemExtended>(
					untradableItems.map((item) => [item.item_page, item]),
				)
				tradableItems.forEach((item) => {
					const itemPage = item.item_page
					let mapItem = itemsMap.get(itemPage)
					if (typeof mapItem !== 'undefined') {
						mapItem.min_price_tradable = item.min_price
						itemsMap.set(itemPage, mapItem)
					} else {
						mapItem = {
							...item,
							...{ min_price_tradable: item.min_price },
						}
						itemsMap.set(itemPage, item)
					}
				})

				return Array.from(itemsMap.values())
			}),
		)
	}

	public async withdraw() {
		const client = await this.databasePool.connect()

		try {
			await client.query('BEGIN')

			const insertEventQuery = `
				insert into
					public.events (
						user_id,
						"action",
						amount
					)
				values (
					1,
					'withdraw',
					100.00
				)
				;
			`
			await client.query(insertEventQuery)

			const updateUserBalanceQuery = `
				update
					users
				set
					balance =
				(
					select
						SUM(case when e.action = 'deposit' then e.amount else -e.amount end) as balance
					from
						events e
					where
						e.user_id = 1
				)
				where
					id = 1
				;
			`
			await client.query(updateUserBalanceQuery)

			const selectUserBalanceQuery = `
				select
					u.balance
				from
					users u
				where
					id = 1
				;
			`
			const balanceResult = await client.query(selectUserBalanceQuery)

			const balance = Number.parseFloat(balanceResult.rows[0].balance)

			if (Number.isNaN(balance) || balance < 0) {
				await client.query('ROLLBACK')
			}
			await client.query('COMMIT')
		} catch (error) {
			await client.query('ROLLBACK')
			throw error
		} finally {
			client.release()
		}
	}
}
