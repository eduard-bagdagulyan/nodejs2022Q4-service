import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export interface TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  isFavorite: boolean;
}

export type CreateTrackType = Omit<TrackEntity, 'id' | 'isFavorite'>;
export type ChangeTrackType = Partial<CreateTrackType>;

export class CreateTrackDTO implements CreateTrackType {
  @ApiProperty({ example: faker.music.songName() })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: faker.datatype.uuid() })
  @IsOptional()
  @IsUUID()
  artistId: string | null = null;

  @ApiPropertyOptional({ example: faker.datatype.uuid() })
  @IsOptional()
  @IsUUID()
  albumId: string | null = null;

  @ApiProperty({
    example: faker.datatype.number({ min: 60000, max: 300000 }),
  })
  @IsNumber()
  duration: number;
}

export class UpdateTrackDTO extends CreateTrackDTO implements ChangeTrackType {
  isFavorite: boolean;
}
