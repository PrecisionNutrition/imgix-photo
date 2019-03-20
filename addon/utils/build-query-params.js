/**
 * Builds a sorted query param string
 */
export default function buildQueryParams(params) {
  return Object
    .entries(params)
    .sort(function([k1], [k2]) {
      return k1.localeCompare(k2);
    })
    .map(function([key, value]) {
      return `${key}=${value}`;
    })
    .join('&');
}
