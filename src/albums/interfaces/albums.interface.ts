import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(props: IAlbum) {
    // TODO change to interface
    Object.assign(this, props);
  }
}

export type CreateAlbumType = Omit<IAlbum, 'id'>;
export type ChangeAlbumType = Partial<CreateAlbumType>; // TODO remove

export class CreateAlbumDTO implements CreateAlbumType {
  @ApiProperty({ example: faker.music.songName() })
  @IsString()
  name: string;

  @ApiProperty({ example: faker.date.past(50).getFullYear() })
  @IsNumber()
  year: number;

  @ApiPropertyOptional({ example: faker.datatype.uuid() })
  @IsOptional()
  @IsUUID()
  artistId: string | null;
}

export class UpdateAlbumDTO extends CreateAlbumDTO {}
