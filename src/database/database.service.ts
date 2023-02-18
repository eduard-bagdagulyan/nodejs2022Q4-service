import { Injectable } from '@nestjs/common';
import DBUsers from './entities/UserEntity';
import DBArtists from './entities/ArtistEntity';
import DBAlbum from './entities/AlbumEntity';
import DBTrack from './entities/TrackEntity';
import {
  DBFavoriteAlbums,
  DBFavoriteArtists,
  DBFavoriteTracks,
} from './entities/FavoriteEntity';

@Injectable()
export class DatabaseService {
  readonly users: DBUsers = new DBUsers();
  readonly artists: DBArtists = new DBArtists();
  readonly albums: DBAlbum = new DBAlbum();
  readonly tracks: DBTrack = new DBTrack();
  readonly favoriteArtists: DBFavoriteArtists = new DBFavoriteArtists();
  readonly favoriteAlbums: DBFavoriteAlbums = new DBFavoriteAlbums();
  readonly favoriteTracks: DBFavoriteTracks = new DBFavoriteTracks();
}
