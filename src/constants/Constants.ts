export const enum LoadingStatus {
  FetchList = "fetchList",
  FetchItem = "fetchItem",
  FetchLastItems = "fetchLastItems",
  FetchPreviousItems = "fetchPreviousItems",
  Create = "CREATE",
  Update = "UPDATE",
  Delete = "DELETE",
  Search = "SEARCH",
  Sort = "SORT",
  Success = "SUCCESS",
  Error = "ERROR",
  Idle = "IDLE",
}

export const enum DialogDimensions {
  Width = "width",
  Height = "height",
  DefaultWidth = 500,
  DefaultHeight = 350,
  MinimalAvailableSize = 0,
}

export const enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export const enum SortOrderTableHeader {
  ASC = "ascend",
  DESC = "descend",
}

export const enum TableHeaderAlign {
  Left = "left",
  Right = "right",
  Center = "center",
}

export const enum HeaderType {
  Text = "text",
}

export const enum CellType {
  Text = "text",
  ACTION = "action",
}

export const enum TableConstants {
  MINIMAL_LOADABLE_HEADER_COUNT = 0,
  DEFAULT_ITEM_COUNT_PER_PAGE = 20,
  PAGINATION_POSITION = "bottomCenter",
}

export const enum ApplicationTheme {
  FontFamily = "IRANSansX",
}

export const enum ApplicationDrawerStatus {
  Open = "open",
  Close = "close",
}

export const enum ToastType {
  Success = "success",
  Failure = "error",
  Info = "info",
  Warning = "warning",
}

export const enum ToastLocation {
  BottomLeft = "bottomLeft",
}

export const enum StatusCode {
  NotFound = 404,
  Unauthorized = 401,
  ServerError = 500,
}

export const enum FormValidationStatus {
  Invalid,
  Valid,
}

export const enum StorageKeys {
  Theme = "theme",
  AccessList = "accessList",
}

export const enum ApplicationTheme {
  Light = "light",
  Dark = "dark",
}
