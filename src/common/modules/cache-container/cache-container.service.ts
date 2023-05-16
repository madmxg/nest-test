import { Injectable } from '@nestjs/common'

import { CacheRecord, TtlCache } from './interfaces'

@Injectable()
export class CacheContainerService implements TtlCache {
	readonly ttl: number
	readonly cache: Record<string, CacheRecord>

	constructor() {
    // 5 minutes
		this.ttl = 300_000
		this.cache = {}
	}

	put(key: string, value: unknown, ttl?: number | undefined): void {
		ttl = typeof ttl === 'number' ? ttl : this.ttl
		const cacheRecord: CacheRecord = {
			value,
			timeout: setTimeout(() => this.delete(key), ttl),
		}
		this.cache[key] = cacheRecord
	}

	get(key: string): unknown | undefined {
		const cacheRecord = this.cache[key]
		return cacheRecord?.value
	}

	delete(key: string): unknown | undefined {
		const cacheRecord = this.cache[key]

		if (typeof cacheRecord !== 'undefined') {
			clearTimeout(cacheRecord.timeout)
			delete this.cache[key]
		}

		return cacheRecord?.value
	}
}
