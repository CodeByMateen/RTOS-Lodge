import { Injectable, HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/common/prisma/prisma.service";
import { UserSignupDto } from "./dto/user-auth.dto";
import { SuccessConstant, ErrorConstant } from "src/common/constants/constant";
import { resError, resSuccess } from "src/common/helpers/response";
import * as _ from "lodash";

@Injectable()
export class UserAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async userSignup(userSignupDto: UserSignupDto) {
    try {
      const { first_name, last_name, email, password, phone_number } =
        userSignupDto;

      const isUserExists = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (isUserExists) {
        return resSuccess(
          "User already exists.",
          SuccessConstant.SUCCESS,
          HttpStatus.CONFLICT,
          "",
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          phone_number: phone_number,
        },
      });

      const userWithoutPassword = _.omit(newUser, "password");
      const token = this.jwtService.sign(
        { userId: userWithoutPassword.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_TOKEN_EXPIRY,
        },
      );
      const response = { user: userWithoutPassword, token: token };

      return resSuccess(
        "User registered successfully.",
        SuccessConstant.SUCCESS,
        HttpStatus.CREATED,
        response,
      );
    } catch (error) {
      console.log(error.message);
      return resError(error.message, ErrorConstant.ERROR, error.status);
    }
  }

  //   async login(email: string, password: string) {
  //     try {
  //       // Find user by email
  //       const user = await this.prisma.user.findUnique({
  //         where: {
  //           email,
  //         },
  //       });

  //       if (!user) {
  //         throw new ConflictException("Invalid credentials");
  //       }

  //       // Verify password
  //       const isPasswordValid = await bcrypt.compare(password, user.password);

  //       if (!isPasswordValid) {
  //         throw new ConflictException("Invalid credentials");
  //       }

  //       // Generate JWT token
  //       const token = this.jwtService.sign({
  //         id: user.id,
  //         email: user.email,
  //       });

  //       // Remove password from response
  //       const { password: _, ...userWithoutPassword } = user;

  //       return resSuccess("Login successful", SuccessConstant.SUCCESS, 200, {
  //         user: userWithoutPassword,
  //         token,
  //       });
  //     } catch (error) {
  //       return resError(
  //         error.message || "Failed to login",
  //         ErrorConstant.ERROR,
  //         error.status || 500,
  //       );
  //     }
  //   }
}
