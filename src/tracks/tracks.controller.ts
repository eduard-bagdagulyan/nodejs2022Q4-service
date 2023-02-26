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
import { TracksService } from './tracks.service';
import { CreateTrackDTO, UpdateTrackDTO } from './interfaces/tracks.interface';
import { IdParamDTO } from '../common/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { TrackEntity } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<TrackEntity[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param() params: IdParamDTO): Promise<TrackEntity> {
    return this.tracksService.getTrackById(params.id);
  }

  @Post()
  async createTrack(@Body() body: CreateTrackDTO): Promise<TrackEntity> {
    return this.tracksService.createTrack(body);
  }

  @Put(':id')
  async updateTrack(
    @Param() params: IdParamDTO,
    @Body() body: UpdateTrackDTO,
  ): Promise<TrackEntity> {
    return this.tracksService.updateTrack(params.id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteTrack(@Param() params: IdParamDTO): Promise<TrackEntity> {
    return this.tracksService.deleteTrack(params.id);
  }
}
