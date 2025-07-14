"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineMetadata = defineMetadata;
/**
 * Produces a metadata‑setting decorator exactly like the TS helper `__metadata`.
 *
 * It delegates to `Reflect.metadata` when the *experimental* “emitDecoratorMetadata”
 * compiler option is active and the **reflect‑metadata** polyfill is present.
 *
 * @param key   – A metadata key (string | symbol) to be stored.
 * @param value – The associated metadata value.
 *
 * @returns A decorator that will attach the key/value pair to the target
 *          (class, method, property, or parameter) when executed.
 */
function defineMetadata(key, value) {
    // The original helper is just a thin wrapper around Reflect.metadata.
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') {
        // Cast is safe because Reflect.metadata returns a decorator compatible
        // with every decorator position.
        return Reflect.metadata(key, value);
    }
    // If reflect‑metadata is not available we return a *noop* decorator
    // so user code still runs without crashing.
    return (() => {
        /* no‑op in non‑reflect environments */
    });
}
