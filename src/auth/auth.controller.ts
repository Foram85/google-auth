import {
  Controller,
  Get,
  Req,
  UseGuards,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/register')
  @UseGuards(AuthGuard('google')) //To redirect to continue with google page
  async getData(@Res() res) {}

  @Get('home')
  @UseGuards(AuthGuard('jwt'))
  async checkRoute(@Req() req) {
    console.log(req.user);
    return { message: `Hey , ${req.user.name}` };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.generateJwt(req.user);
    return res.json({ token: jwt });
  }
}
