import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTrackDTO,
  TrackEntity,
  UpdateTrackDTO,
} from './interfaces/tracks.interface';
import { DatabaseService } from '../database/database.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly db: DatabaseService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAllTracks(): Promise<TrackEntity[]> {
    return this.db.tracks.findMany();
  }

  async getTrackById(id: string): Promise<TrackEntity> {
    const track = await this.db.tracks.findOne({ key: 'id', equals: id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(body: CreateTrackDTO): Promise<TrackEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }

    if (body.albumId) {
      await this.albumsService.getAlbumById(body.albumId);
    }

    return this.db.tracks.create(body);
  }

  async updateTrack(id: string, body: UpdateTrackDTO): Promise<TrackEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }

    if (body.albumId) {
      await this.albumsService.getAlbumById(body.albumId);
    }

    await this.getTrackById(id);
    return this.db.tracks.change(id, body);
  }

  async deleteTrack(id: string): Promise<TrackEntity> {
    await this.getTrackById(id);

    const isInFavorites = await this.db.favoriteTracks.findOne({
      key: 'id',
      equals: id,
    });

    if (isInFavorites) {
      await this.db.favoriteTracks.delete(id);
    }

    return this.db.tracks.delete(id);
  }
}
