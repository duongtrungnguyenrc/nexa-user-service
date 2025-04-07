import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { v4 as uuid } from "uuid";

import { JwtRefreshService } from "@jwt-refresh";
import { JwtAccessService } from "@jwt-access";
import { UserService } from "@user";

import { RefreshTokenDto, TokenPairDto, UserCredentialDto, VerifyUserDto, LogOutDto } from "./dtos";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAccessService: JwtAccessService,
    private readonly jwtRefreshService: JwtRefreshService,
  ) {}

  async verifyUser(request: VerifyUserDto): Promise<UserCredentialDto | null> {
    const credential = await this.userService.findUserCredential(request.email);

    if (!credential) return null;
    return compareSync(request.password, credential.passwordHash) ? credential : null;
  }

  async logIn(payload: VerifyUserDto): Promise<TokenPairDto> {
    const validateResult = await this.verifyUser(payload);

    if (!validateResult) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const jit = uuid();

    return {
      accessToken: this.jwtAccessService.generateToken({
        sub: validateResult.id,
        jit: jit,
      }),
      refreshToken: this.jwtRefreshService.generateToken({
        sub: validateResult.id,
        jit: jit,
      }),
    };
  }

  async logOut(request: LogOutDto): Promise<boolean> {
    const decoded = this.jwtAccessService.decodeToken(request.accessToken);

    await Promise.all([this.jwtAccessService.revokeToken(decoded), this.jwtRefreshService.revokeToken(decoded)]);

    return true;
  }

  async refresh(request: RefreshTokenDto): Promise<TokenPairDto> {
    const decoded = await this.jwtRefreshService.verifyToken(request.refreshToken);

    if (!decoded) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return {
      accessToken: this.jwtAccessService.generateToken({
        sub: decoded.sub,
        jit: decoded.jit,
      }),
      refreshToken: this.jwtRefreshService.generateToken({
        sub: decoded.sub,
        jit: decoded.jit,
      }),
    };
  }
}
