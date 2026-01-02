export interface IWriteRepository<T> {
  create(data: T): Promise<T>;
  update(data: T): Promise<T>;
}
