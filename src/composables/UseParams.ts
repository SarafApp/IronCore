import { Ref, ref } from "vue";
import { SortDetail } from "../sort";
import { BaseModel } from "../BaseModel";
import { Params } from "../repository";

const DEFAULT_PARAMS = new Params();

export function useParams() {
  const params: Ref<Params> = ref(structuredClone(DEFAULT_PARAMS));

  function setNextPage() {
    params.value.pageNumber = params.value.pageNumber + 1;
  }

  function setPreventPage() {
    params.value.pageNumber = params.value.pageNumber - 1;
  }

  function setPageNumber(pageNumber: number) {
    params.value.pageNumber = pageNumber;
  }

  function setItemCount(itemCount: number) {
    params.value.itemCount = itemCount;
  }

  function setSortDetail(sortDetail: SortDetail<BaseModel>) {
    params.value.sortDetail.key = sortDetail.key;
    params.value.sortDetail.order = sortDetail.order;
  }

  function setFilter(key: string, value: unknown) {
    const index = params.value.filters.findIndex(
      (filter) => filter.key === key,
    );
    if (index > -1) params.value.filters[index].value = value;
    else params.value.filters.push({ key, value });
  }

  function clearParam() {
    params.value = structuredClone(DEFAULT_PARAMS);
  }

  return {
    params,
    setNextPage,
    setPreventPage,
    setPageNumber,
    setItemCount,
    setSortDetail,
    setFilter,
    clearParam,
  };
}
