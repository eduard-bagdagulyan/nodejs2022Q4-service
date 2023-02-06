import * as crypto from 'crypto';
import DBEntity from './DBEntity';
import {
  AlbumEntity,
  ChangeAlbumType,
  CreateAlbumType,
} from '../../albums/interfaces/albums.interface';

export default class DBAlbum extends DBEntity<
  AlbumEntity,
  ChangeAlbumType,
  CreateAlbumType
> {
  async create(dto: CreateAlbumType) {
    const created: AlbumEntity = new AlbumEntity({
      id: crypto.randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    });
    this.entities.push(created);
    return created;
  }
}
