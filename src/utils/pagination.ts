/**
 * 默认分页参数
 * **/
export interface PaginationDefault {
  page?: number;
  size?: number;
}

export const getDefaultPagination = (params: PaginationDefault) => {
  const { page = 1, size = 10 } = params;
  return { skip: (page - 1) * size, take: size };
};

export interface PaginationParams {
  take: number;
  skip: number;
  count: number;
  list: any[];
}

/**
 * 分页处理
 * **/

export const pagination = (params: PaginationParams) => {
  const { take, skip, count, list } = params;
  return {
    list,
    count,
    currentPage: skip + 1,
    pageSize: take,
    totalPage: Math.ceil(count / take) || 1,
  };
};
