import { Repository } from 'typeorm';

/**
 * 分页处理
 * **/
export interface PaginationParams {
  repository: Repository<any>;
  page?: number | string;
  size?: number | string;
  [property: number | string]: any;
}

export const pagination = async (params: PaginationParams) => {
  // eslint-disable-next-line prefer-const
  let { page = 1, size = 10, repository, ...rest } = params;

  if (typeof page === 'string') {
    page = parseInt(page);
  }

  if (typeof size === 'string') {
    size = parseInt(size);
  }

  const [list, count] = await repository.findAndCount({
    take: size,
    skip: (page - 1) * size,
    ...rest,
  });

  return {
    data: list,
    count: count,
    currentPage: page,
    pageSize: size,
    totalPage: Math.ceil(count / size) || 1,
  };
};
