import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import {
  AlbumEntity,
  CreateAlbumDTO,
  UpdateAlbumDTO,
} from './interfaces/albums.interface';
import { IdParamDTO } from '../common/interfaces';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param() params: IdParamDTO): Promise<AlbumEntity> {
    return this.albumsService.getAlbumById(params.id);
  }

  @Post()
  async createAlbum(@Body() body: CreateAlbumDTO): Promise<AlbumEntity> {
    return this.albumsService.createAlbum(body);
  }

  @Put(':id')
  async updateAlbum(
    @Param() params: IdParamDTO,
    @Body() body: UpdateAlbumDTO,
  ): Promise<AlbumEntity> {
    return this.albumsService.updateAlbum(params.id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(@Param() params: IdParamDTO): Promise<AlbumEntity> {
    return this.albumsService.deleteAlbum(params.id);
  }
}
