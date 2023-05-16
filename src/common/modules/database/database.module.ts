import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabasePool } from './database-pool.provider'
import { databaseConfig } from './config'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [databaseConfig],
		}),
	],
	providers: [DatabasePool],
	exports: [DatabasePool],
})
export class DatabaseModule {}
