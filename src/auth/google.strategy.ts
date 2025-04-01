/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import axios from 'axios';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName,
      image: profile.photos[0].value,
    };
    console.log(user);
    const mutationQuery = `
      mutation MyMutation {
        insert_users(objects: {
          email: "${user.email}", 
          password: "", 
          name: "${user.displayName}", 
          image: "${user.image}", 
          googleId: "${user.googleId}"
        }) {
          returning {
            id
          }
        }
      }
    `;

    try {
      const data = await axios.post(
        'http://localhost:8080/v1/graphql',
        { query: mutationQuery },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'ironwoman890',
          },
        },
      );

      done(null, user);
    } catch (error) {
      console.error('GraphQL Error:', error.response?.data || error.message);
      done(error, null);
    }
  }
}
