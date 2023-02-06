import * as crypto from 'crypto';
import DBEntity from './DBEntity';
import {
  ChangeTrackType,
  CreateTrackType,
  TrackEntity,
} from '../../tracks/interfaces/tracks.interface';

export default class DBTrack extends DBEntity<
  TrackEntity,
  ChangeTrackType,
  CreateTrackType
> {
  async create(dto: CreateTrackType) {
    const created: TrackEntity = new TrackEntity({
      id: crypto.randomUUID(),
      ...dto,
    });
    this.entities.push(created);
    return created;
  }
}
