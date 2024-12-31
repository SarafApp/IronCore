import { computed, Ref, ref } from "vue";
import { BaseModel } from "../BaseModel";
import { Nullable } from "../types";

export function useData<Model extends BaseModel>() {
  const items: Ref<Map<number, Model>> = ref<Map<number, Model>>(
    new Map<number, Model>(),
  ) as Ref<Map<number, Model>>;

  const totalCount = ref<number>(0);
  const currentItem = ref<Nullable<Model>>(null);

  const itemsAsArray = computed<Model[]>(() => {
    return Array.from(items.value.values()) as Model[];
  });

  function setTotalCount(totalItems: number) {
    totalCount.value = totalItems;
  }

  function addOrReplaceItems(itemsToAdd: Model[]) {
    for (const item of itemsToAdd) {
      addOrReplaceItem(item);
    }
  }

  function addOrReplaceItem(item: Model) {
    items.value.set(item.id, item);
  }

  function getById(id: number): Nullable<Model> {
    currentItem.value = items.value.get(id) || null;
    return currentItem.value;
  }

  function removeById(id: number): boolean {
    const removedItem = getById(id);

    if (removedItem) {
      items.value.delete(id);
    }

    return Boolean(removedItem);
  }

  function clearItems() {
    items.value.clear();
  }

  function setCurrentItem(item: Nullable<Model>) {
    currentItem.value = item;
  }

  function clearCurrentItem() {
    currentItem.value = null;
  }

  return {
    itemsAsArray,
    totalCount,
    currentItem,
    setTotalCount,
    addOrReplaceItems,
    getById,
    removeById,
    clearItems,
    setCurrentItem,
    clearCurrentItem,
  };
}
