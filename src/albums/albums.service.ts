import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDTO, UpdateAlbumDTO } from './interfaces/albums.interface';
import { ArtistsService } from '../artists/artists.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
    private readonly artistsService: ArtistsService,
  ) {}

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumsRepository.find();
  }

  async getFavoriteAlbums(): Promise<AlbumEntity[]> {
    return this.albumsRepository.findBy({ isFavorite: true });
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(body: CreateAlbumDTO): Promise<AlbumEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }
    const album = this.albumsRepository.create(body);
    return this.albumsRepository.save(album);
  }

  async updateAlbum(id: string, body: UpdateAlbumDTO): Promise<AlbumEntity> {
    if (body.artistId) {
      await this.artistsService.getArtistById(body.artistId);
    }
    await this.getAlbumById(id);
    await this.albumsRepository.update({ id }, body);
    return this.albumsRepository.findOneBy({ id });
  }

  async deleteAlbum(id: string): Promise<AlbumEntity> {
    const album = await this.getAlbumById(id);
    await this.albumsRepository.delete({ id });
    return album;
  }
}
