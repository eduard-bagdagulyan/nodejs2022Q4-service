import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  ArtistEntity,
  CreateArtistDTO,
  UpdateArtistDTO,
} from './interfaces/artists.interface';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: DatabaseService) {}

  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.db.artists.findMany();
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    const artist = await this.db.artists.findOne({ key: 'id', equals: id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async createArtist(body: CreateArtistDTO): Promise<ArtistEntity> {
    return this.db.artists.create(body);
  }

  async updateArtist(id: string, body: UpdateArtistDTO): Promise<ArtistEntity> {
    await this.getArtistById(id);
    return this.db.artists.change(id, body);
  }

  async deleteArtist(id: string): Promise<ArtistEntity> {
    await this.getArtistById(id);
    return this.db.artists.delete(id);
  }
}
