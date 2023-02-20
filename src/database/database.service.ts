import { Injectable } from '@nestjs/common';
import DBArtists from './entities/ArtistEntity';
import DBTrack from './entities/TrackEntity';
import {
  DBFavoriteAlbums,
  DBFavoriteArtists,
  DBFavoriteTracks,
} from './entities/FavoriteEntity';

@Injectable()
export class DatabaseService {
  readonly artists: DBArtists = new DBArtists();
  readonly tracks: DBTrack = new DBTrack();
  readonly favoriteArtists: DBFavoriteArtists = new DBFavoriteArtists();
  readonly favoriteAlbums: DBFavoriteAlbums = new DBFavoriteAlbums();
  readonly favoriteTracks: DBFavoriteTracks = new DBFavoriteTracks();
}
