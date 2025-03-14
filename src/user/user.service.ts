import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  FindCredentialsPayload,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@user';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.userClient.getService('UserService');

    this.getCredential({ email: 'duongtrungnguyenrc@gmail.com' });
  }

  async getCredential(request: FindCredentialsPayload) {
    const data = await lastValueFrom(this.userService.findCredentials(request));
    console.log(data);
    return data;
  }
}
