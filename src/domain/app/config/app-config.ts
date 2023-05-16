import { registerAs } from '@nestjs/config'
import { AppConfig } from './app-config.interface'
import {
	parseEnvValue,
	EnvironmentType,
} from '../../../common/helpers/parse-env'

export const appConfig = registerAs<AppConfig>('app', () => ({
	nodeEnv: parseEnvValue('NODE_ENV', EnvironmentType.ENVIRONMENT_TYPE_STRING),
	httpPort: parseEnvValue('HTTP_PORT', EnvironmentType.ENVIRONMENT_TYPE_NUMBER),
}))
