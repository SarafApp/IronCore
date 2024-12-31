export interface MountedDirective {
  mounted(element: unknown, binding: unknown, vnode: unknown): void;
}
