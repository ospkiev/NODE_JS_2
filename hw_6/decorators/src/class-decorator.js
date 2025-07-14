"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogClass = LogClass;
const tokens_1 = require("./tokens");
const map = new Map();
function LogClass(meta) {
    return function (target) {
        Reflect.defineMetadata(tokens_1.CLASS_META, Object.assign(Object.assign({}, meta), { created: new Date() }), target);
    };
}
