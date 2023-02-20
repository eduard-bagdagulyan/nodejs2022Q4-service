import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  FavoriteEntity,
  FavoritesResponse,
} from './interfaces/favories.interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAllFavoriteItems(): Promise<FavoritesResponse> {
    const favoriteArtists = await this.artistsService.getFavoriteArtists();
    const favoriteAlbums = await this.albumsService.getFavoriteAlbums();
    const favoriteTracks = await this.tracksService.getFavoriteTracks();

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  async addFavoriteTrack(id: string): Promise<FavoriteEntity> {
    try {
      const track = await this.tracksService.getTrackById(id);
      return this.tracksService.updateTrack(id, { ...track, isFavorite: true });
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async deleteTrackFromFavorites(id: string): Promise<FavoriteEntity> {
    const track = await this.tracksService.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track is not in favorites');
    }
    return this.tracksService.updateTrack(id, { ...track, isFavorite: false });
  }

  async addFavoriteAlbum(id: string): Promise<FavoriteEntity> {
    try {
      const album = await this.albumsService.getAlbumById(id);
      return this.albumsService.updateAlbum(id, { ...album, isFavorite: true });
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async deleteAlbumFromFavorites(id: string): Promise<FavoriteEntity> {
    const album = await this.albumsService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album is not in favorites');
    }
    return this.albumsService.updateAlbum(id, { ...album, isFavorite: false });
  }

  async addFavoriteArtist(id: string): Promise<FavoriteEntity> {
    try {
      const artist = await this.artistsService.getArtistById(id);
      return this.artistsService.updateArtist(id, {
        ...artist,
        isFavorite: true,
      });
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async deleteArtistFromFavorites(id: string): Promise<FavoriteEntity> {
    const artist = await this.artistsService.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist is not in favorites');
    }
    return this.artistsService.updateArtist(id, {
      ...artist,
      isFavorite: false,
    });
  }
}
