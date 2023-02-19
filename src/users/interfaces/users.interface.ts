import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../entities/user.entity';

export type CreateUserType = Pick<UserEntity, 'login' | 'password'>;
export type ChangeUserType = Partial<Omit<UserEntity, 'id'>>;

const fakeUserName = faker.internet.userName();
const fakePassword = faker.internet.password();

export class CreateUserDTO implements CreateUserType {
  @ApiProperty({ example: fakeUserName })
  @IsString()
  login: string;

  @ApiProperty({ example: fakePassword })
  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty({
    example: fakePassword,
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: faker.internet.password(),
  })
  @IsString()
  newPassword: string;
}
