import { NestFactory } from "@nestjs/core"; 
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { join } from "path";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("handlebars");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("RTOS-Lodge")
    .setDescription("RTOS-Lodge API Documentation")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT Token",
        in: "header",
      },
      "JWT-Auth",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.security = [
    {
      JWT_auth: [],
    },
  ];

  SwaggerModule.setup("api-docs", app, document);

  await app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening on port:${process.env.PORT}`);
  });
}
bootstrap();
