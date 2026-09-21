/**
 * Represents the result of an operation that can either succeed or fail.
 *
 * The tuple contains either an error and `null`, or `null` and the
 * successfully resolved value.
 *
 * @typeParam T - The type of the successful result.
 *
 * @example
 * ```ts
 * const result: TryCatchResult<number> = [null, 42];
 *
 * if (result[0]) {
 *   console.error(result[0]);
 * } else {
 *   console.log(result[1]);
 * }
 * ```
 */
export type TryCatchResult<T> = readonly [Error, null] | readonly [null, T];

/**
 * Executes or resolves a value and captures errors without throwing them.
 *
 * Supports synchronous values, promises, promise-like values, and functions
 * that return either synchronous or asynchronous results.
 *
 * For successful operations, the result is returned as `[null, value]`.
 * If an error occurs, the result is returned as `[error, null]`.
 *
 * @typeParam T - The type of the input or resolved value.
 * @param value - A synchronous value, promise-like value, or function
 * that produces a value.
 * @returns A tuple containing either the error or the successful result.
 * Asynchronous inputs produce a `Promise` resolving to the result tuple.
 *
 * @example
 * ```ts
 * const [error, data] = tryCatch(() => JSON.parse(json));
 *
 * if (error) {
 *   console.error("Failed to parse JSON:", error);
 * } else {
 *   console.log(data);
 * }
 * ```
 *
 * @example
 * ```ts
 * const [error, data] = await tryCatch(fetch("/api/users"));
 *
 * if (error) {
 *   console.error("Request failed:", error);
 * } else {
 *   console.log(data);
 * }
 * ```
 *
 * @example
 * ```ts
 * const [error, value] = tryCatch(42);
 *
 * if (!error) {
 *   console.log(value); // 42
 * }
 * ```
 */
export function tryCatch<T>(
  value: PromiseLike<T>,
): Promise<TryCatchResult<Awaited<T>>>;

export function tryCatch<T>(
  value: () => T,
): T extends PromiseLike<unknown>
  ? Promise<TryCatchResult<Awaited<T>>>
  : TryCatchResult<T>;

export function tryCatch<T>(
  value: T,
): T extends PromiseLike<unknown>
  ? Promise<TryCatchResult<Awaited<T>>>
  : TryCatchResult<T>;

export function tryCatch(value: unknown): unknown {
  if (typeof value === "function") {
    try {
      const result = (value as () => unknown)();

      if (
        result &&
        typeof result === "object" &&
        "then" in (result as object)
      ) {
        return Promise.resolve(result)
          .then((data) => [null, data] as const)
          .catch((err) => [err as Error, null] as const);
      }

      return [null, result] as const;
    } catch (err) {
      return [err as Error, null] as const;
    }
  }

  if (value && typeof value === "object" && "then" in (value as object)) {
    return Promise.resolve(value)
      .then((data) => [null, data] as const)
      .catch((err) => [err as Error, null] as const);
  }

  return [null, value] as const;
}
