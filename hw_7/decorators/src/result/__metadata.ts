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
export function defineMetadata<T = any>(
  key: string | symbol,
  value: T,
): ClassDecorator &
  MethodDecorator &
  PropertyDecorator &
  ParameterDecorator {
  // The original helper is just a thin wrapper around Reflect.metadata.
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') {
    // Cast is safe because Reflect.metadata returns a decorator compatible
    // with every decorator position.
    return Reflect.metadata(key, value) as any;
  }

  // If reflect‑metadata is not available we return a *noop* decorator
  // so user code still runs without crashing.
  return (() => {
    /* no‑op in non‑reflect environments */
  }) as any;
}