import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  FavoriteEntity,
  FavoritesResponse,
} from './interfaces/favories.interface';
import { ArtistEntity } from '../artists/interfaces/artists.interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumEntity } from '../albums/interfaces/albums.interface';
import { TrackEntity } from '../tracks/interfaces/tracks.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAllFavoriteItems(): Promise<FavoritesResponse> {
    const favoriteArtistsIds: FavoriteEntity[] =
      await this.db.favoriteArtists.findMany();
    const favoriteAlbumsIds: FavoriteEntity[] =
      await this.db.favoriteAlbums.findMany();
    const favoriteTracksIds: FavoriteEntity[] =
      await this.db.favoriteTracks.findMany();

    const favoriteArtists: ArtistEntity[] = [];
    const favoriteAlbums: AlbumEntity[] = [];
    const favoriteTracks: TrackEntity[] = [];

    for (const item of favoriteArtistsIds) {
      const artist = await this.artistsService.getArtistById(item.id);
      favoriteArtists.push(artist);
    }

    for (const item of favoriteAlbumsIds) {
      const album = await this.albumsService.getAlbumById(item.id);
      favoriteAlbums.push(album);
    }

    for (const item of favoriteTracksIds) {
      const track = await this.tracksService.getTrackById(item.id);
      favoriteTracks.push(track);
    }

    return {
      albums: favoriteAlbums,
      artists: favoriteArtists,
      tracks: favoriteTracks,
    };
  }

  async addFavoriteTrack(id: string): Promise<FavoriteEntity> {
    await this.tracksService.getTrackById(id);
    return this.db.favoriteTracks.create({ id });
  }

  async deleteTrackFromFavorites(id: string): Promise<FavoriteEntity> {
    const track = await this.db.favoriteTracks.findOne({
      key: 'id',
      equals: id,
    });
    if (!track) {
      throw new NotFoundException('Track is not in favorites');
    }
    return this.db.favoriteTracks.delete(id);
  }

  async addFavoriteAlbum(id: string): Promise<FavoriteEntity> {
    await this.albumsService.getAlbumById(id);
    return this.db.favoriteAlbums.create({ id });
  }

  async deleteAlbumFromFavorites(id: string): Promise<FavoriteEntity> {
    const album = await this.db.favoriteAlbums.findOne({
      key: 'id',
      equals: id,
    });
    if (!album) {
      throw new NotFoundException('Album is not in favorites');
    }
    return this.db.favoriteAlbums.delete(id);
  }

  async addFavoriteArtist(id: string): Promise<FavoriteEntity> {
    await this.albumsService.getAlbumById(id);
    return this.db.favoriteAlbums.create({ id });
  }

  async deleteArtistFromFavorites(id: string): Promise<FavoriteEntity> {
    const artist = await this.db.favoriteArtists.findOne({
      key: 'id',
      equals: id,
    });
    if (!artist) {
      throw new NotFoundException('Artist is not in favorites');
    }
    return this.db.favoriteArtists.delete(id);
  }
}
