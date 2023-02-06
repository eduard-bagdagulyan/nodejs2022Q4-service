import { Injectable } from '@nestjs/common';
import DBUsers from './entities/UserEntity';
import DBArtists from './entities/ArtistEntity';
import DBAlbum from './entities/AlbumEntity';
import DBTrack from './entities/TrackEntity';

@Injectable()
export class DatabaseService {
  readonly users: DBUsers = new DBUsers();
  readonly artists: DBArtists = new DBArtists();
  readonly albums: DBAlbum = new DBAlbum();
  readonly tracks: DBTrack = new DBTrack();
}
