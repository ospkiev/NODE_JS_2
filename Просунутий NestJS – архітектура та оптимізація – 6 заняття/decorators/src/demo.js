"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tokens_1 = require("./tokens");
const class_decorator_1 = require("./class-decorator");
const property_decorator_1 = require("./property-decorator");
const accessor_decorator_1 = require("./accessor-decorator");
const method_decorator_1 = require("./method-decorator");
const parameter_decorator_1 = require("./parameter-decorator");
let ExampleLogs = class ExampleLogs {
    constructor(_age) {
        this._age = _age;
        this.name = 'Ada';
    }
    get age() { return this._age; }
    set age(value) { this._age = value; }
    greet(message) {
        return `${message}, I’m ${this.name} and I’m ${this.age}.`;
    }
};
__decorate([
    property_decorator_1.LogProperty,
    __metadata("design:type", String)
], ExampleLogs.prototype, "name", void 0);
__decorate([
    accessor_decorator_1.LogAccessor,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ExampleLogs.prototype, "age", null);
__decorate([
    method_decorator_1.LogMethod,
    __param(0, parameter_decorator_1.LogParam),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], ExampleLogs.prototype, "greet", null);
ExampleLogs = __decorate([
    (0, class_decorator_1.LogClass)({
        add: 'This is a class decorator',
    }),
    __metadata("design:paramtypes", [Number])
], ExampleLogs);
/** ------------------------------------------------------------------
 *  Read the metadata back out
 *  ------------------------------------------------------------------*/
const cls = ExampleLogs;
const proto = cls.prototype;
const instance = new ExampleLogs(35);
console.log('Class metadata:', Reflect.getMetadata(tokens_1.CLASS_META, cls));
console.log('\nProperty metadata (name):', Reflect.getMetadata(tokens_1.PROP_META, proto, 'name'));
console.log('\nAccessor metadata (age):', Reflect.getMetadata(tokens_1.ACCESSOR_META, proto, 'age'));
console.log('\nMethod metadata (greet):', Reflect.getMetadata(tokens_1.METHOD_META, proto, 'greet'));
console.log('\nParameter metadata (greet):', Reflect.getMetadata(tokens_1.PARAM_META, proto, 'greet'));
console.log({
    class: cls.name,
    prototype: proto,
    instance: instance,
    name: instance.name,
    age: instance.age,
    greet: instance.greet('Hello'),
});
