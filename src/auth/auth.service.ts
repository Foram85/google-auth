import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: any) {
    const payLoad = {
      email: user.email,
      sub: user.googleId,
    };
    return {
      access_token: this.jwtService.sign(payLoad),
    };
  }
}
