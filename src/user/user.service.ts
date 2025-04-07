import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { UserCredentialDto } from "@auth";

import { UserEntity } from "./models";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  findUserCredential(email: string): Promise<UserCredentialDto> {
    return this.userRepository.findOne({ where: { email: email }, select: ["id", "email", "passwordHash"] });
  }
}
