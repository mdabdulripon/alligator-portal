export interface IPagination {
  currentPage: number;
  totalPages: number;
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
