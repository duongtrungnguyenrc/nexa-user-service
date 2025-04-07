import { Controller, Post } from "@nestjs/common";

import { LogOutDto, RefreshTokenDto, TokenPairDto, UserCredentialDto, VerifyUserDto } from "./dtos";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  logIn(request: VerifyUserDto): Promise<TokenPairDto> {
    return this.authService.logIn(request);
  }

  @Post("logout")
  logOut(request: LogOutDto): Promise<boolean> {
    return this.authService.logOut(request);
  }

  @Post("refresh")
  refresh(request: RefreshTokenDto): Promise<TokenPairDto> {
    return this.authService.refresh(request);
  }
}
