import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-local";

import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.authService.verifyUser({
      email,
      password,
    });
  }
}
