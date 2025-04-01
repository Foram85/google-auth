import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import axios from 'axios';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretkey221',
    });
  }

  async validate(payload: any) {
    const getUserQuery = `
        query MyQuery {
            users(where: {email: {_eq: "${payload.email}"}}) {
                email
                id
                googleId
                name

            }
        }

    `;
    const data = await axios.post(
      'http://localhost:8080/v1/graphql',
      { query: getUserQuery },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'ironwoman890',
          'x-hasura-role': 'admin',
        },
      },
    );
    return data.data.data.users[0];
  }
}
