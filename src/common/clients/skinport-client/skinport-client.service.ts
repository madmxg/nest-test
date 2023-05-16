import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AxiosRequestConfig } from 'axios'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

import { SkinportItemReadDto } from './dto'

const SKINPORT_APP_ID = 730
const SKINPORT_CURRENCY = 'EUR'

@Injectable()
export class SkinportClientService {
	constructor(private skinportClient: HttpService) {}

	public readItems(tradable: boolean = false): Observable<SkinportItemReadDto> {
		const url = 'items'

		const axiosRequestConfig: AxiosRequestConfig = {
			params: {
				app_id: SKINPORT_APP_ID,
				currency: SKINPORT_CURRENCY,
				tradable,
			},
		}

		return this.skinportClient
			.get<SkinportItemReadDto>(url, axiosRequestConfig)
			.pipe(map((apiResponse) => apiResponse.data))
	}
}
