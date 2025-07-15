"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAccessor = LogAccessor;
const tokens_1 = require("./tokens");
function LogAccessor(target, propertyKey, descriptor) {
    Reflect.defineMetadata(tokens_1.ACCESSOR_META, { descriptor }, target, propertyKey);
}
