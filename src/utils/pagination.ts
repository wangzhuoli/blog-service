/**
 * 默认分页参数
 * **/
export interface PaginationDefault {
  current?: number;
  pageSize?: number;
}

export const getDefaultPagination = (params: PaginationDefault) => {
  const { current = 1, pageSize = 10 } = params;
  return { skip: (current - 1) * pageSize, take: pageSize };
};

export interface PaginationParams {
  take: number;
  skip: number;
  total: number;
  list: any[];
}

/**
 * 分页处理
 * **/

export const pagination = (params: PaginationParams) => {
  const { take, skip, total, list } = params;
  return {
    list,
    total,
    currentPage: skip / take + 1,
    pageSize: take,
    totalPage: Math.ceil(total / take) || 1,
  };
};
