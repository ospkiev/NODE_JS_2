import {PARAM_META} from "./tokens";

export function LogParam(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) {
  const existing: number[] = Reflect.getOwnMetadata(PARAM_META, target, propertyKey) || [];
  existing.push(parameterIndex);
  Reflect.defineMetadata(PARAM_META, existing, target, propertyKey);
}