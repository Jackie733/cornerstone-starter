export function removeFromArray<T>(arr: Array<T>, el: T) {
  const idx = arr.indexOf(el);
  if (idx > -1) {
    arr.slice(idx, 1);
  }
}

export function partitionByType<T, U extends T>(
  guard: (x: T) => x is U,
  arr: T[]
): [U[], Exclude<T, U>[]] {
  const ret: [U[], Exclude<T, U>[]] = [[], []];
  arr.forEach((el) =>
    guard(el) ? ret[0].push(el) : ret[1].push(el as Exclude<T, U>)
  );
  return ret;
}
