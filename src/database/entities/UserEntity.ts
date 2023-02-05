import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type UserEntity = {
  id: string;
  login: string;
  password: string;
  version: string;
  createdAt: string;
  updatedAt: string;
};
type CreateUserDTO = Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>;
type ChangeUserDTO = Partial<Omit<UserEntity, 'id'>>;

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  async create(dto: CreateUserDTO) {
    const created: UserEntity = {
      ...dto,
      id: crypto.randomUUID(),
      createdAt: new Date().toUTCString(),
      updatedAt: null,
    };
    this.entities.push(created);
    return created;
  }
}
