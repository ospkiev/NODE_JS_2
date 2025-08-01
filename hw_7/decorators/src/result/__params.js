"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindParameterDecorator = bindParameterDecorator;
/**
 * Binds a **parameter decorator** to a specific parameter index,
 * recreating the behaviour of the compiler helper `__param`.
 *
 * Usage example:
 * ```ts
 * class Demo {
 *   method(@bindParameterDecorator(0, logParam) arg: string) { … }
 * }
 * ```
 *
 * @param index      – The zero‑based index of the parameter to decorate.
 * @param decorator  – The actual `ParameterDecorator` you want to apply.
 *
 * @returns A wrapper function that the TypeScript runtime will treat
 *          as a *method* decorator, but internally forwards the call
 *          to your `decorator` with the bound `index`.
 */
function bindParameterDecorator(index, decorator) {
    return (target, propertyKey) => {
        decorator(target, propertyKey, index);
    };
}
