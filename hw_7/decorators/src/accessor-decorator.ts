import {ACCESSOR_META} from "./tokens";

export function LogAccessor(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  Reflect.defineMetadata(ACCESSOR_META, { descriptor }, target, propertyKey);
}