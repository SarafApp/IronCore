export interface BeforeUpdateDirective {
  beforeUpdate(element: unknown, binding: unknown, vnode: unknown): void;
}
