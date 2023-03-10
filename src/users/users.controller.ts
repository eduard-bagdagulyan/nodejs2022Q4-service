import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './interfaces/users.interface';
import { ApiTags } from '@nestjs/swagger';
import { IdParamDTO } from '../common/interfaces';
import { UserEntity } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param() params: IdParamDTO): Promise<UserEntity> {
    return this.usersService.getUserById(params.id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<UserEntity> {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  async updateUser(
    @Param() params: IdParamDTO,
    @Body() body: UpdateUserDTO,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(params.id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param() params: IdParamDTO): Promise<UserEntity> {
    return this.usersService.deleteUser(params.id);
  }
}
