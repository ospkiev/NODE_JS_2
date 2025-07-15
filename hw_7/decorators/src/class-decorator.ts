import {CLASS_META} from "./tokens";

export function LogClass(meta?: object) {
  return function (target: Function) {
    Reflect.defineMetadata(CLASS_META, {...meta, created: new Date()}, target);
  }
}
