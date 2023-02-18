import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';
import {
  ChangeUserType,
  CreateUserType,
  UserEntity,
} from '../../users/interfaces/users.interface';
import { NotFoundException } from '@nestjs/common';

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserType,
  CreateUserType
> {
  async create(dto: CreateUserType) {
    const created: UserEntity = new UserEntity({
      ...dto,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });
    this.entities.push(created);
    return created;
  }

  async change(id: string, changeDTO: UserEntity) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1)
      throw new NotFoundException('Fail during: delete', 'No required entity');
    const changed: UserEntity = new UserEntity({
      ...this.entities[idx],
      ...changeDTO,
    });
    this.entities.splice(idx, 1, changed);
    return changed;
  }
}
