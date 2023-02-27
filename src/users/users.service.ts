import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './interfaces/users.interface';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByLogin(login: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ login });
  }

  async createUser(body: CreateUserDTO): Promise<UserEntity> {
    const user = await this.usersRepository.create({
      ...body,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });

    return this.usersRepository.save(user);
  }

  async updateUser(id: string, body: UpdateUserDTO): Promise<UserEntity> {
    const user = await this.getUserById(id);

    if (user.password !== body.oldPassword) {
      throw new ForbiddenException('Old password is invalid');
    }

    const userWithChangedPassword: UserEntity = this.usersRepository.create({
      ...user,
      password: body.newPassword,
      version: ++user.version,
      updatedAt: Date.now(),
    });
    await this.usersRepository.update({ id }, userWithChangedPassword);
    return userWithChangedPassword;
  }

  async updateUserToken(id: string, token: string) {
    const user = await this.getUserById(id);
    return this.usersRepository.update(
      { id },
      { ...user, refreshToken: token },
    );
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const user = await this.getUserById(id);
    await this.usersRepository.delete({ id });
    return user;
  }
}
