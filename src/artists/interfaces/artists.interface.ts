import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export interface ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;
  isFavorite: boolean;
}

export type CreateArtistType = Omit<ArtistEntity, 'id' | 'isFavorite'>;
export type ChangeArtistType = Partial<CreateArtistType>;

export class CreateArtistDTO implements CreateArtistType {
  @ApiProperty({ example: faker.name.fullName() })
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDTO
  extends CreateArtistDTO
  implements ChangeArtistType
{
  isFavorite: boolean;
}
