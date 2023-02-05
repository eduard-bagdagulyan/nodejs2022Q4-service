import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor(props: ArtistEntity) {
    Object.assign(this, props);
  }
}

export type CreateArtistType = Omit<ArtistEntity, 'id'>;
export type ChangeArtistType = Partial<CreateArtistType>;

export class CreateArtistDTO implements CreateArtistType {
  @ApiProperty({ example: faker.name.fullName() })
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDTO extends CreateArtistDTO {}
