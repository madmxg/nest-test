import { parseEnvArray } from './parse-env-array';
import { parseEnvNumber } from './parse-env-number';
import { parseEnvString } from './parse-env-string';
import { EnvironmentType } from './environment-type.enum';

export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_STRING,
): string;
export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_NUMBER,
): number;
export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_ARRAY_STRING,
): Array<string>;
export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_ARRAY_NUMBER,
): Array<number>;

export function parseEnvValue(
  envValueName: string,
  envType: EnvironmentType,
): string | number | Array<string> | Array<number> {
  const envValue = process.env[envValueName];

  const envValueString = parseEnvString(envValue, envValueName);

  switch (envType) {
    case EnvironmentType.ENVIRONMENT_TYPE_STRING:
      return envValueString;
    case EnvironmentType.ENVIRONMENT_TYPE_NUMBER:
      return parseEnvNumber(envValueString, envValueName);
    case EnvironmentType.ENVIRONMENT_TYPE_ARRAY_STRING:
      return parseEnvArray(envValueString, envValueName, envType);
    case EnvironmentType.ENVIRONMENT_TYPE_ARRAY_NUMBER:
      return parseEnvArray(envValueString, envValueName, envType);
    default:
      const envTypeNever: never = envType;
      throw new TypeError(`Invalid EnvironmentType '${String(envTypeNever)}'`);
  }
}
