import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './common/decorators/public.decorator';
import { CreateUserDTO } from './users/interfaces/users.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from './auth/guards/refreshToken.guard';
import { Request } from 'express';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDTO) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: CreateUserDTO) {
    return this.authService.login(body);
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
