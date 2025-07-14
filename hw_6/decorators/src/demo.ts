import 'reflect-metadata';
import {
  ACCESSOR_META,
  CLASS_META,
  METHOD_META,
  PARAM_META,
  PROP_META,
} from './tokens';
import { LogClass } from './class-decorator';
import { LogProperty } from './property-decorator';
import { LogAccessor } from './accessor-decorator';
import { LogMethod } from './method-decorator';
import { LogParam } from './parameter-decorator';

@LogClass({
  add: 'This is a class decorator',
})
class ExampleLogs {
  @LogProperty name: string = 'Ada';

  constructor(private _age: number) {}

  @LogAccessor
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }

  @LogMethod
  greet(@LogParam message: string): string {
    return `${message}, I’m ${this.name} and I’m ${this.age}.`;
  }
}

/** ------------------------------------------------------------------
 *  Read the metadata back out
 *  ------------------------------------------------------------------*/
const cls = ExampleLogs;
const proto = cls.prototype;
const instance = new ExampleLogs(35);

console.log('Class metadata:', Reflect.getMetadata(CLASS_META, cls));

console.log(
  '\nProperty metadata (name):',
  Reflect.getMetadata(PROP_META, proto, 'name')
);

console.log(
  '\nAccessor metadata (age):',
  Reflect.getMetadata(ACCESSOR_META, proto, 'age')
);

console.log(
  '\nMethod metadata (greet):',
  Reflect.getMetadata(METHOD_META, proto, 'greet')
);

console.log(
  '\nParameter metadata (greet):',
  Reflect.getMetadata(PARAM_META, proto, 'greet')
);

console.log({
  class: cls.name,
  prototype: proto,
  instance: instance,
  name: instance.name,
  age: instance.age,
  greet: instance.greet('Hello'),
});
