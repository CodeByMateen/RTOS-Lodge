import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "src/common/prisma/prisma.module";
import { Module } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { UserAuthController } from "./user-auth.controller";

@Module({
  imports: [PrismaModule],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtService],
})
export class UserAuthModule {}
