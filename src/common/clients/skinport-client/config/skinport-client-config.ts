import { registerAs } from '@nestjs/config'

import { parseEnvValue, EnvironmentType } from '../../../helpers/parse-env'
import { SkinportClientConfig } from './skinport-client-config.interface'
import { SKINPORT_CLIENT_TOKEN } from './skinport-client.constants'

export const skinportClientConfig = registerAs<SkinportClientConfig>(
	SKINPORT_CLIENT_TOKEN,
	() => ({
		baseUri: parseEnvValue(
			'SKINPORT_CLIENT_BASE_URI',
			EnvironmentType.ENVIRONMENT_TYPE_STRING,
		),
		timeout: parseEnvValue(
			'SKINPORT_CLIENT_TIMEOUT',
			EnvironmentType.ENVIRONMENT_TYPE_NUMBER,
		),
	}),
)
