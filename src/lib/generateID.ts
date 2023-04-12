/**
 * @see https://github.com/toss/slash/blob/main/packages/common/utils/src/generateID.ts
 */
let nextUniqueId = 0;

export function generateID(prefix = '') {
  nextUniqueId = nextUniqueId + 1;
  return `${prefix}${nextUniqueId}`;
}
