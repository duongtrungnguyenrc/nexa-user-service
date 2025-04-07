import { createNestroApplication } from "@duongtrungnguyen/nestro";

import { AppModule } from "@app.module";

async function bootstrap() {
  const app = await createNestroApplication(AppModule, {
    server: {
      host: "localhost",
    },
    client: {
      name: "user-service",
      host: "localhost",
      port: 3001,
    },
    security: {
      publicKeyPath: "~/keys/public.pem",
      privateKeyPath: "~/keys/private.pem",
    },
    loadbalancing: {
      strategy: "least-connections",
    },
  });

  await app.listen();
}
bootstrap();
