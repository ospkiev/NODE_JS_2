"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogParam = LogParam;
const tokens_1 = require("./tokens");
function LogParam(target, propertyKey, parameterIndex) {
    const existing = Reflect.getOwnMetadata(tokens_1.PARAM_META, target, propertyKey) || [];
    existing.push(parameterIndex);
    Reflect.defineMetadata(tokens_1.PARAM_META, existing, target, propertyKey);
}
