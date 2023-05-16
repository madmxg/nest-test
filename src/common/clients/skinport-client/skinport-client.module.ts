import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { SkinportClientService } from './skinport-client.service'
import {
	SKINPORT_CLIENT_TOKEN,
	SkinportClientConfig,
	skinportClientConfig,
} from './config'

const httpDinamicModule = HttpModule.registerAsync({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => {
		const skinportClientConfig = configService.get<SkinportClientConfig>(
			SKINPORT_CLIENT_TOKEN,
		) as SkinportClientConfig

		return {
			baseURL: skinportClientConfig.baseUri,
			timeout: skinportClientConfig.timeout,
			maxRedirects: 0,
		}
	},
})

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [skinportClientConfig],
		}),
		httpDinamicModule,
	],
	exports: [SkinportClientService],
	providers: [SkinportClientService],
})
export class SkinportClientModule {}
