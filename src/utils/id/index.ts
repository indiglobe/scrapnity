type TId = { length?: number };

export function id(options?: TId) {
  return crypto
    .randomUUID()
    .split("-")
    .join("")
    .toUpperCase()
    .slice(0, options?.length ?? 9);
}
