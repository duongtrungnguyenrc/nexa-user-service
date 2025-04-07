import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtRefreshService } from './jwt-refresh.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  providers: [JwtRefreshService, JwtRefreshStrategy],
  exports: [JwtRefreshService, JwtRefreshStrategy],
})
export class JwtRefreshModule {}
