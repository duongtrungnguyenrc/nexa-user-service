import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtAccessService } from './jwt-access.service';
import { JwtAccessStrategy } from './jwt-access.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  providers: [JwtAccessService, JwtAccessStrategy],
  exports: [JwtAccessService, JwtAccessStrategy],
})
export class JwtAccessModule {}
