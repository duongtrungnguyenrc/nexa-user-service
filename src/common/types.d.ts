type JwtPayloadContent = {
  sub: string;
  jit: string;
};

type JwtPayload = JwtPayloadContent & {
  exp: number;
  iat: number;
};
