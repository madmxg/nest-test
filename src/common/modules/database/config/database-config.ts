import { registerAs } from '@nestjs/config'

import { parseEnvValue, EnvironmentType } from '../../../helpers/parse-env'
import { DatabaseConfig } from './database-config.interface'
import { DATABASE_TOKEN } from './database.constants'

export const databaseConfig = registerAs<DatabaseConfig>(
	DATABASE_TOKEN,
	() => ({
		postgresqlConnectionString: parseEnvValue(
			'POSTGRESQL_CONNECTION_STRING',
			EnvironmentType.ENVIRONMENT_TYPE_STRING,
		),
	}),
)
