import { Pool } from 'pg'
import { ConfigService } from '@nestjs/config'
import { Injectable, Scope } from '@nestjs/common'

import { DATABASE_TOKEN, DatabaseConfig } from './config'

@Injectable({ scope: Scope.REQUEST })
export class DatabasePool extends Pool {
	// @ts-ignore
	constructor(private readonly configService: ConfigService) {
		const databaseConfig = configService.get<DatabaseConfig>(
			DATABASE_TOKEN,
		) as DatabaseConfig

		super({ connectionString: databaseConfig.postgresqlConnectionString })
	}
}
