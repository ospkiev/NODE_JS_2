import {METHOD_META} from "./tokens";

export function LogMethod(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  const returnType  = Reflect.getMetadata('design:returntype', target, propertyKey);
  const paramTypes  = Reflect.getMetadata('design:paramtypes', target, propertyKey);

  console.log({
    name: `LogMethod ${String(propertyKey)}`,
    descriptor
  })

  Reflect.defineMetadata(
    METHOD_META,
    { returnType, paramTypes },
    target,
    propertyKey,
  );
}