export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  items?: T;
  pagination?: Pagination;
}
