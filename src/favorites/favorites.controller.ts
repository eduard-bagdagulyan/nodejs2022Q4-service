import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favories.interface';
import { IdParamDTO } from '../common/interfaces';

@ApiTags('Favorite')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavoriteItems(): Promise<FavoritesResponse> {
    return this.favoritesService.getAllFavoriteItems();
  }

  @Post('track/:id')
  async addFavoriteTrack(@Param() params: IdParamDTO): Promise<string> {
    await this.favoritesService.addFavoriteTrack(params.id);
    return `Track ${params.id} added to favorites successfully!`;
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrackFromFavorites(@Param() params: IdParamDTO): Promise<void> {
    await this.favoritesService.deleteTrackFromFavorites(params.id);
  }

  @Post('album/:id')
  async addFavoriteAlbum(@Param() params: IdParamDTO): Promise<string> {
    await this.favoritesService.addFavoriteAlbum(params.id);
    return `Album ${params.id} added to favorites successfully!`;
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbumFromFavorites(@Param() params: IdParamDTO): Promise<void> {
    await this.favoritesService.deleteAlbumFromFavorites(params.id);
  }

  @Post('artist/:id')
  async addFavoriteArtist(@Param() params: IdParamDTO): Promise<string> {
    await this.favoritesService.addFavoriteArtist(params.id);
    return `Artist ${params.id} added to favorites successfully!`;
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtistFromFavorites(@Param() params: IdParamDTO): Promise<void> {
    await this.favoritesService.deleteArtistFromFavorites(params.id);
  }
}
