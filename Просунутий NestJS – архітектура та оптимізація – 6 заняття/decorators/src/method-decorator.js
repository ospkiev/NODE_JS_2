"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMethod = LogMethod;
const tokens_1 = require("./tokens");
function LogMethod(target, propertyKey, descriptor) {
    const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
    const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
    console.log({
        name: `LogMethod ${String(propertyKey)}`,
        descriptor
    });
    Reflect.defineMetadata(tokens_1.METHOD_META, { returnType, paramTypes }, target, propertyKey);
}
