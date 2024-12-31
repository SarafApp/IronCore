import { computed, ref } from "vue";
import { LoadingStatus } from "../constants";

export function useLoadingStatus() {
  const loadingStatus = ref<Set<LoadingStatus>>(new Set<LoadingStatus>());

  const isFetchingList = computed(() => {
    return loadingStatus.value.has(LoadingStatus.FetchList);
  });

  const isFetchingItem = computed(() => {
    return loadingStatus.value.has(LoadingStatus.FetchItem);
  });

  const isFetchingLastItems = computed(() => {
    return loadingStatus.value.has(LoadingStatus.FetchLastItems);
  });

  const isFetchingPreviousItems = computed(() => {
    return loadingStatus.value.has(LoadingStatus.FetchPreviousItems);
  });

  const isCreating = computed(() => {
    return loadingStatus.value.has(LoadingStatus.Create);
  });

  const isUpdating = computed(() => {
    return loadingStatus.value.has(LoadingStatus.Update);
  });

  const isDeleting = computed(() => {
    return loadingStatus.value.has(LoadingStatus.Delete);
  });

  const isSearching = computed(() => {
    return loadingStatus.value.has(LoadingStatus.Search);
  });

  const isSorting = computed(() => {
    return loadingStatus.value.has(LoadingStatus.Sort);
  });

  function setStatus(status: LoadingStatus) {
    loadingStatus.value.add(status);
  }

  function removeStatus(status: LoadingStatus) {
    loadingStatus.value.delete(status);
  }

  return {
    loadingStatus,
    isFetchingList,
    isFetchingItem,
    isFetchingLastItems,
    isFetchingPreviousItems,
    isCreating,
    isUpdating,
    isDeleting,
    isSearching,
    isSorting,
    setStatus,
    removeStatus,
  };
}
