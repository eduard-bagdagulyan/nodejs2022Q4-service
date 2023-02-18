import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { faker } from '@faker-js/faker';

export class IdParamDTO {
  @ApiProperty({ example: faker.datatype.uuid() })
  @IsUUID()
  id: string;
}
