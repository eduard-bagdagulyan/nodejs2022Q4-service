import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDTO,
  IdParamDTO,
  UpdateUserDTO,
  UserEntity,
} from './interfaces/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
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
