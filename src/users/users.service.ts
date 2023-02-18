import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserEntity,
} from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.db.users.findMany();
  }

  async getUserById(id): Promise<UserEntity> {
    const user = await this.db.users.findOne({ key: 'id', equals: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(body: CreateUserDTO): Promise<UserEntity> {
    return this.db.users.create(body);
  }

  async updateUser(id: string, body: UpdateUserDTO): Promise<UserEntity> {
    const user = await this.getUserById(id);

    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is invalid');
    }

    const userWithChangedPassword: UserEntity = new UserEntity({
      ...user,
      password: body.newPassword,
      version: ++user.version,
      updatedAt: Date.now(),
    });
    return this.db.users.change(id, userWithChangedPassword);
  }

  async deleteUser(id: string): Promise<UserEntity> {
    await this.getUserById(id);
    return this.db.users.delete(id);
  }
}
