import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { UserEntity } from "./models";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
