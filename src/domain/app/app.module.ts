import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { appConfig } from './config'
import { ItemsModule } from '../items/items.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig],
		}),
		ItemsModule,
	],
})
export class AppModule {}
