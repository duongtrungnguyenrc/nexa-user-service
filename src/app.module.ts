import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import * as path from "path";

import { AuthModule } from "@auth";
import { UserModule } from "@user";

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("MYSQL_HOST"),
        port: configService.get<number>("MYSQL_PORT"),
        database: configService.get<string>("MYSQL_DB"),
        username: configService.get<string>("MYSQL_USER"),
        password: configService.get<string>("MYSQL_PASSWORD"),
        entities: [path.join(__dirname, "**", "*.entity{.ts,.js}")],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
