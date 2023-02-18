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
import { ArtistsService } from './artists.service';
import { IdParamDTO } from '../common/interfaces';
import {
  ArtistEntity,
  CreateArtistDTO,
  UpdateArtistDTO,
} from './interfaces/artists.interface';

@ApiTags('Artist')
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param() params: IdParamDTO): Promise<ArtistEntity> {
    return this.artistsService.getArtistById(params.id);
  }

  @Post()
  async createArtist(@Body() body: CreateArtistDTO): Promise<ArtistEntity> {
    return this.artistsService.createArtist(body);
  }

  @Put(':id')
  async updateArtist(
    @Param() params: IdParamDTO,
    @Body() body: UpdateArtistDTO,
  ): Promise<ArtistEntity> {
    return this.artistsService.updateArtist(params.id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteArtist(@Param() params: IdParamDTO): Promise<ArtistEntity> {
    return this.artistsService.deleteArtist(params.id);
  }
}
