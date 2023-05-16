import { EnvironmentType } from './environment-type.enum';
import { parseEnvNumber } from './parse-env-number';

export function parseEnvArray(
  envValue: string,
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_ARRAY_STRING,
): Array<string>;
export function parseEnvArray(
  envValue: string,
  envValueName: string,
  envType: EnvironmentType.ENVIRONMENT_TYPE_ARRAY_NUMBER,
): Array<number>;
export function parseEnvArray(
  envValue: string,
  envValueName: string,
  envType:
    | EnvironmentType.ENVIRONMENT_TYPE_ARRAY_STRING
    | EnvironmentType.ENVIRONMENT_TYPE_ARRAY_NUMBER,
): Array<string> | Array<number> {
  const arrayEnvStringValues = envValue.split(',').map((value) => value.trim());

  switch (envType) {
    case EnvironmentType.ENVIRONMENT_TYPE_ARRAY_STRING:
      return arrayEnvStringValues;
    case EnvironmentType.ENVIRONMENT_TYPE_ARRAY_NUMBER:
      const arrayEnvNumberValues = arrayEnvStringValues.map((arrayEnvStringValue) =>
        parseEnvNumber(arrayEnvStringValue, envValueName),
      );
      return arrayEnvNumberValues;
    default:
      throw new TypeError(`Invalid ENV ${envValueName}`);
  }
}
