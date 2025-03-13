import { 
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { UserRequest } from "src/common/interface/request";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    let tokenData = null;
    if (token) {
      tokenData = this.jwtService.decode(token);
    }

    if (!tokenData) {
      throw new UnauthorizedException("Invalid token, User not authorized");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: tokenData.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not authorized");
    }

    if (user) {
      req.user = user;
    }

    //   const inspector = await this.prisma.inspector.findFirst({
    //     where: {
    //       id: tokenData.userId,
    //     },
    //   });

    //   const customer = await this.prisma.customer.findFirst({
    //     where: {
    //       id: tokenData.userId,
    //     },
    //   });

    //   const builder = await this.prisma.builder.findFirst({
    //     where: {
    //       id: tokenData.userId,
    //     },
    //   });

    //   const admin = await this.prisma.admin.findFirst({
    //     where: {
    //       id: tokenData.userId,
    //     },
    //   });

    //   if (!customer && !admin && !inspector && !builder) {
    //     throw new UnauthorizedException('User not authorized');
    //   }

    //   if (admin) {
    //     req.user = admin;
    //   }
    //   if (builder) {
    //     req.user = builder;
    //   }
    //   if (customer) {
    //     req.user = customer;
    //   }
    //   if (inspector) {
    //     req.user = inspector;
    //   }

    next();
  }
}
