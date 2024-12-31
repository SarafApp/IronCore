export interface UnMountedDirective {
  unMounted(element: unknown, binding: unknown, vnode: unknown): void;
}
