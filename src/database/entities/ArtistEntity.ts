import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';
import {
  ArtistEntity,
  ChangeArtistType,
  CreateArtistType,
} from '../../artists/interfaces/artists.interface';

export default class DBArtists extends DBEntity<
  ArtistEntity,
  CreateArtistType,
  ChangeArtistType
> {
  async create(dto: CreateArtistType) {
    const created: ArtistEntity = new ArtistEntity({
      id: crypto.randomUUID(),
      ...dto,
    });
    this.entities.push(created);
    return created;
  }
}
