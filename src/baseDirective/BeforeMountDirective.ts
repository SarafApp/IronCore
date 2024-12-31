export interface BeforeMountDirective {
  beforeMount(el: unknown, binding: unknown, vnode: unknown): void;
}
