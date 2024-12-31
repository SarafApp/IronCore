import { useData } from "./UseData";
import { useParams } from "./UseParams";
import { useLoadingStatus } from "./UseLoadingStatus";
import { Repository } from "../repository";
import { LoadingStatus } from "../constants";
import { SortDetail } from "../sort";
import { BaseModel } from "../BaseModel";
import { TableRenderingData } from "../baseTable";
import { computed } from "vue";
import { Params } from "../repository";
import { TableService } from "../baseTable";

export function useRepository<Model extends BaseModel>(
  repository: Repository<Model>,
) {
  const dataManger = useData();
  const paramsManager = useParams();
  const loadingStatusManager = useLoadingStatus();

  const tableRenderingData = computed<TableRenderingData<Model>>(() => {
    return {
      totalItems: dataManger.totalCount.value,
      currentPage: paramsManager.params.value.pageNumber,
      rows: dataManger.itemsAsArray.value,
      loadingStatus: loadingStatusManager.loadingStatus.value,
    } as TableRenderingData<Model>;
  });

  const tableService = computed<TableService<Model>>(() => {
    return {
      getData: getTableRenderingData,
      sort: sort,
      paginate: fetchItemsByPageNumber,
      fetchRows: fetchList,
    };
  });

  function getTableRenderingData(): TableRenderingData<Model> {
    return tableRenderingData.value;
  }

  async function handleFetchList(query?: Params) {
    const result = await repository.fetchList(query);
    dataManger.addOrReplaceItems(result);
    return result;
  }

  async function fetchList() {
    loadingStatusManager.setStatus(LoadingStatus.FetchList);
    const result = await handleFetchList(paramsManager.params.value);
    loadingStatusManager.removeStatus(LoadingStatus.FetchList);
    return result;
  }

  async function fetchItemById(id: number) {
    loadingStatusManager.setStatus(LoadingStatus.FetchItem);
    dataManger.clearCurrentItem();
    const result = await repository.fetchItemById(id);
    dataManger.setCurrentItem(result);
    loadingStatusManager.removeStatus(LoadingStatus.FetchItem);
    return result;
  }

  async function createItem<Body>(body: Body) {
    loadingStatusManager.setStatus(LoadingStatus.Create);
    const result = await repository.createItem(body);
    if (result) {
      dataManger.addOrReplaceItems([result]);
    }
    loadingStatusManager.removeStatus(LoadingStatus.Create);
    return result;
  }

  async function updateItem<Body>(id: number, body: Body) {
    loadingStatusManager.setStatus(LoadingStatus.Update);
    const result = await repository.updateItem(id, body);
    if (result) {
      dataManger.addOrReplaceItems([result]);
    }
    loadingStatusManager.removeStatus(LoadingStatus.Update);
    return result;
  }

  async function deleteItem(id: number) {
    loadingStatusManager.setStatus(LoadingStatus.Delete);
    await repository.deleteItem(id);
    loadingStatusManager.removeStatus(LoadingStatus.Delete);
    return dataManger.removeById(id);
  }

  async function fetchLastItems() {
    paramsManager.setNextPage();
    loadingStatusManager.setStatus(LoadingStatus.FetchLastItems);
    const result = await handleFetchList(paramsManager.params.value);
    loadingStatusManager.removeStatus(LoadingStatus.FetchLastItems);
    return result;
  }

  async function fetchPreviousItems() {
    paramsManager.setPreventPage();
    loadingStatusManager.setStatus(LoadingStatus.FetchPreviousItems);
    const result = await handleFetchList(paramsManager.params.value);
    loadingStatusManager.removeStatus(LoadingStatus.FetchPreviousItems);
    return result;
  }

  async function fetchItemsByPageNumber(pageNumber: number) {
    paramsManager.setPageNumber(pageNumber);
    loadingStatusManager.setStatus(LoadingStatus.FetchList);
    const result = await handleFetchList(paramsManager.params.value);
    loadingStatusManager.removeStatus(LoadingStatus.FetchList);
    return result;
  }

  async function search(searchedValue: string) {
    paramsManager.setFilter("search", searchedValue);
    loadingStatusManager.setStatus(LoadingStatus.Search);
    dataManger.clearItems();
    const result = await handleFetchList(paramsManager.params.value);
    loadingStatusManager.removeStatus(LoadingStatus.Search);
    return result;
  }

  async function sort(sortDetail: SortDetail<Model>) {
    paramsManager.setSortDetail(sortDetail as SortDetail<BaseModel>);
    loadingStatusManager.setStatus(LoadingStatus.Sort);
    dataManger.clearItems();
    const result = await handleFetchList(paramsManager.params.value);
    loadingStatusManager.removeStatus(LoadingStatus.Sort);
    return result;
  }

  async function clearFilters() {
    paramsManager.clearParam();
    return await fetchList();
  }

  return {
    loadingStatusManager,
    dataManger,
    paramsManager,
    tableRenderingData,
    fetchList,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
    fetchLastItems,
    fetchPreviousItems,
    fetchItemsByPageNumber,
    search,
    sort,
    clearFilters,
    tableService,
  };
}
