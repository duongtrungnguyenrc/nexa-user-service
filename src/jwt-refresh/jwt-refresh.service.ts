import { Cache } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { REFRESH_TOKEN_BLACK_LIST_KEY, JwtHandler } from '@common';

@Injectable()
export class JwtRefreshService extends JwtHandler {
  constructor(jwtService: JwtService, cacheManager: Cache) {
    super(jwtService, cacheManager, REFRESH_TOKEN_BLACK_LIST_KEY);
  }
}
