import {PROP_META} from "./tokens";

export function LogProperty(target: Object, propertyKey: string | symbol) {
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  Reflect.defineMetadata(PROP_META, { type }, target, propertyKey);
}
