import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
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
    private readonly db: DatabaseService,
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistsRepository.find();
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
    const user = await this.getArtistById(id);

    // const artistsTracks = await this.db.tracks.findMany({
    //   key: 'artistId',
    //   equals: id,
    // });
    // for (const track of artistsTracks) {
    //   await this.db.tracks.change(track.id, {
    //     ...track,
    //     artistId: null,
    //   });
    // }
    //
    // const artistsAlbums = await this.db.albums.findMany({
    //   key: 'artistId',
    //   equals: id,
    // });
    // for (const album of artistsAlbums) {
    //   await this.db.albums.change(album.id, {
    //     ...album,
    //     artistId: null,
    //   });
    // }
    //
    // const isInFavorites = await this.db.favoriteArtists.findOne({
    //   key: 'id',
    //   equals: id,
    // });
    //
    // if (isInFavorites) {
    //   await this.db.favoriteArtists.delete(id);
    // } TODO add relation

    await this.artistsRepository.delete({ id });
    return user;
  }
}
