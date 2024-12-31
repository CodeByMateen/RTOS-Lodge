import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Failed to connect to the database", error);
      process.exit(1);
    }
  }
}
