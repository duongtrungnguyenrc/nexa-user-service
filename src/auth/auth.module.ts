import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { JwtRefreshModule } from "@jwt-refresh";
import { JwtAccessModule } from "@jwt-access";
import { UserModule } from "@user";

@Module({
  imports: [PassportModule.register({}), JwtAccessModule, JwtRefreshModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
