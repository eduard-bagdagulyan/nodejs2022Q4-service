import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDTO, UpdateTrackDTO } from './interfaces/tracks.interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TrackEntity } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAllTracks(): Promise<TrackEntity[]> {
    return this.tracksRepository.find();
  }

  async getTrackById(id: string): Promise<TrackEntity> {
    const track = await this.tracksRepository.findOneBy({ id });
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

    const track = this.tracksRepository.create(body);
    return this.tracksRepository.save(track);
  }

  async updateTrack(id: string, body: UpdateTrackDTO): Promise<TrackEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }

    if (body.albumId) {
      await this.albumsService.getAlbumById(body.albumId);
    }

    await this.getTrackById(id);
    await this.tracksRepository.update({ id }, body);
    return this.tracksRepository.findOneBy({ id });
  }

  async deleteTrack(id: string): Promise<TrackEntity> {
    const track = await this.getTrackById(id);

    // const isInFavorites = await this.db.favoriteTracks.findOne({
    //   key: 'id',
    //   equals: id,
    // });
    //
    // if (isInFavorites) {
    //   await this.db.favoriteTracks.delete(id);
    // } TODO check

    await this.tracksRepository.delete({ id });
    return track;
  }
}
