import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './domain/app/app.module'
import { AppConfig } from './domain/app/config'

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)

	const configService = app.get<ConfigService>(ConfigService)
	const appConfig = configService.get<AppConfig>('app') as AppConfig

	await app.listen(appConfig.httpPort)
}

bootstrap()
