export interface BeforeUnMountDirective {
  beforeUnMount(element: unknown, binding: unknown, vnode: unknown): void;
}
