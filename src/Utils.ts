export function isOnlyOneItem(total: number): boolean {
  return total === 1;
}

export function isLastItem(total: number, index: number): boolean {
  return total - 1 === index;
}

export function isEmpty(value: unknown): boolean {
  return String(value).length === 0 || value === null || value === undefined;
}

export function setupStore(initializer: Function) {
  initializer();
}
