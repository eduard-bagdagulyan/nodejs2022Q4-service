import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateArtistDTO,
  UpdateArtistDTO,
} from './interfaces/artists.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistsRepository.find();
  }

  async getFavoriteArtists(): Promise<ArtistEntity[]> {
    return this.artistsRepository.findBy({ isFavorite: true });
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async createArtist(body: CreateArtistDTO): Promise<ArtistEntity> {
    const artist = this.artistsRepository.create(body);
    return this.artistsRepository.save(artist);
  }

  async updateArtist(id: string, body: UpdateArtistDTO): Promise<ArtistEntity> {
    await this.getArtistById(id);
    await this.artistsRepository.update({ id }, body);
    return await this.getArtistById(id);
  }

  async deleteArtist(id: string): Promise<ArtistEntity> {
    const artist = await this.getArtistById(id);
    await this.artistsRepository.delete({ id });
    return artist;
  }
}
