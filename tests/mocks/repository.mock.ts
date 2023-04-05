import { Repository } from 'typeorm';

export const repositoryMockFactory = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  findAndCount: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  merge: jest.fn((target, source) => Object.assign(target, source)),
  softDelete: jest.fn(() => ({ affected: 1 })),
  createQueryBuilder: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    addOrderBy: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    into: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue(Promise.resolve(this)),
    getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    getMany: jest.fn().mockResolvedValue([]),
    getOne: jest.fn().mockResolvedValue({}),
  })),
});

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
