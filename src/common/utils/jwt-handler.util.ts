import { Cache } from "@nestjs/cache-manager";
import { JwtService } from "@nestjs/jwt";

import { joinCacheKey } from "./helpers.util";

export class JwtHandler {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cacheManager: Cache,
    private readonly cacheKey: string,
  ) {}

  decodeToken(token: string): JwtPayload {
    return this.jwtService.decode<JwtPayload>(token);
  }

  generateToken(payload: JwtPayloadContent): string {
    return this.jwtService.sign(payload);
  }

  async revokeToken(payload: JwtPayloadContent & Pick<JwtPayload, "exp">): Promise<void>;
  async revokeToken(token: string): Promise<void>;
  async revokeToken(data: (JwtPayloadContent & Pick<JwtPayload, "exp">) | string): Promise<void> {
    if (typeof data === "string") {
      const decodedToken = this.decodeToken(data);

      const currentTime = Math.floor(Date.now() / 1000);
      const tokenValidTime = (decodedToken["exp"] - currentTime) * 1000;

      return this.revokeToken({
        ...decodedToken,
        exp: tokenValidTime,
      });
    }

    await this.cacheManager.set(joinCacheKey(this.cacheKey, data.sub, data.jit), "revoked", data.exp);
  }

  async verifyToken(token: string): Promise<JwtPayload | null> {
    try {
      if (await this.isRevoked(token)) return null;

      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  async isRevoked(token: string): Promise<boolean> {
    const decodedToken = this.decodeToken(token);

    const revokedToken = await this.cacheManager.get(joinCacheKey(this.cacheKey, decodedToken.sub, decodedToken.jit));

    return !!revokedToken;
  }
}
