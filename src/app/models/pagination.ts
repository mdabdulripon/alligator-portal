export interface IPagination {
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  items: T;
  pagination: IPagination;

  constructor(items: T, pagination: IPagination) {
    this.items = items;
    this.pagination = pagination;
  }
}
