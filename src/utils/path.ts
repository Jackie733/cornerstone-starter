/**
 * "a//b" and "a/b/" become "a/b"
 * @param path
 */
export function normalize(path: string) {
  return path.replace(/\/+/g, '/').replace(/\/$/, '');
}

/**
 * Joins path segments with / and normalizes the result.
 * @param segments
 */
export function join(...segments: string[]) {
  return normalize(segments.join('/'));
}
