import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(props: UserEntity) {
    Object.assign(this, props);
  }
}

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
