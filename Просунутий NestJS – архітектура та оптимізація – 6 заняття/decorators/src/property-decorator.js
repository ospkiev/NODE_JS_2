"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogProperty = LogProperty;
const tokens_1 = require("./tokens");
function LogProperty(target, propertyKey) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Reflect.defineMetadata(tokens_1.PROP_META, { type }, target, propertyKey);
}
