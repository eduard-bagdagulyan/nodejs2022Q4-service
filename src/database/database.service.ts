import { Injectable } from '@nestjs/common';
import {
  DBFavoriteAlbums,
  DBFavoriteArtists,
  DBFavoriteTracks,
} from './entities/FavoriteEntity';

@Injectable()
export class DatabaseService {
  readonly favoriteArtists: DBFavoriteArtists = new DBFavoriteArtists();
  readonly favoriteAlbums: DBFavoriteAlbums = new DBFavoriteAlbums();
  readonly favoriteTracks: DBFavoriteTracks = new DBFavoriteTracks();
}
