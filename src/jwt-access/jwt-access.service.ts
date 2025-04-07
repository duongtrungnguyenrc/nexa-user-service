import { Cache } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ACCESS_TOKEN_BLACK_LIST_KEY, JwtHandler } from '@common';

@Injectable()
export class JwtAccessService extends JwtHandler {
  constructor(jwtService: JwtService, cacheManager: Cache) {
    super(jwtService, cacheManager, ACCESS_TOKEN_BLACK_LIST_KEY);
  }
}
