"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDecorators = applyDecorators;
/**
 * Applies an array of decorators to a class declaration, a class member,
 * or a property descriptor, reproducing the logic that the TypeScript
 * compiler emits in JavaScript as the `__decorate` helper.
 *
 * The return value mirrors the JavaScript helper:
 *  • For classes → the decorated constructor (or the original one).
 *  • For members → the possibly‑patched property descriptor.
 */
function applyDecorators(decorators, target, propertyKey, descriptor) {
    // -------------------------------------------------------------
    // 1. Fast path: if the ES reflection‑based helper exists, delegate.
    // -------------------------------------------------------------
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') {
        const u_descriptor = descriptor !== null && descriptor !== void 0 ? descriptor : undefined;
        return Reflect.decorate(decorators, target, propertyKey, u_descriptor);
    }
    /**
     * The TS compiler calls the helper in three slightly different shapes,
     * which we distinguish by the number of arguments we received (`argc`):
     *
     *  • argc < 3  → decorating a **class**
     *  • argc = 3  → decorating a **property** (no descriptor yet)
     *  • argc > 3  → decorating a **method/accessor/property** with a descriptor
     */
    const argc = arguments.length;
    let result = argc < 3 ? target : descriptor !== null && descriptor !== void 0 ? descriptor : Object.getOwnPropertyDescriptor(target, propertyKey);
    // -------------------------------------------------------------
    // 2. Run decorators from *last* to *first*, per the spec.
    // -------------------------------------------------------------
    for (let i = decorators.length - 1; i >= 0; i--) {
        const decorator = decorators[i];
        if (!decorator)
            continue; // Skip `undefined` slots that the compiler may inject.
        if (argc < 3) {
            // Class decorator: (constructor) => constructor | void
            result = decorator(result) || result;
        }
        else if (argc > 3) {
            // Method / accessor / property with descriptor
            result = decorator(target, propertyKey, result) || result;
        }
        else {
            // Property decorator (no descriptor yet)
            decorator(target, propertyKey);
        }
    }
    // -------------------------------------------------------------
    // 3. If we produced a descriptor for a member, re‑define it.
    // -------------------------------------------------------------
    if (argc > 3 && result) {
        Object.defineProperty(target, propertyKey, result);
    }
    // 4. Finally, return the decorated target / descriptor.
    return result;
}
