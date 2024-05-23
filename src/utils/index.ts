export function removeFromArray<T>(arr: Array<T>, el: T) {
  const idx = arr.indexOf(el);
  if (idx > -1) {
    arr.slice(idx, 1);
  }
}