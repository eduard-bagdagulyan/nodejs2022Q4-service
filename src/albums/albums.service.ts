import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AlbumEntity,
  CreateAlbumDTO,
  UpdateAlbumDTO,
} from './interfaces/albums.interface';
import { DatabaseService } from '../database/database.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly artistsService: ArtistsService,
  ) {}

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.db.albums.findMany();
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    const album = await this.db.albums.findOne({ key: 'id', equals: id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(body: CreateAlbumDTO): Promise<AlbumEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }
    return this.db.albums.create(body);
  }

  async updateAlbum(id: string, body: UpdateAlbumDTO): Promise<AlbumEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }
    await this.getAlbumById(id);
    return this.db.albums.change(id, body);
  }

  async deleteAlbum(id: string): Promise<AlbumEntity> {
    await this.getAlbumById(id);
    return this.db.albums.delete(id);
  }
}
