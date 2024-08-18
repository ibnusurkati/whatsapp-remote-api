import { HttpStatus } from '@nestjs/common';

export interface DefaultResponsePaginateInterface {
  keyword: string;
  page: number;
  size: number;
  totalPage: number;
  totalData: number;
}

export interface DefaultResponseInterface<T = any> {
  success?: boolean;
  statusCode?: HttpStatus;
  timestamp?: string;
  message?: string;
  validationData?: any;
  data?: T;
  paginate?: DefaultResponsePaginateInterface;
}
