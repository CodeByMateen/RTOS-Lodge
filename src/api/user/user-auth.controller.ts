import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserAuthService } from "./user-auth.service";
import { UserSignupDto } from "./dto/user-auth.dto";
import { Response } from "express";

@ApiTags("User Auth")
@Controller("user")
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  async userSignup(@Body() userSignupDto: UserSignupDto, @Res() res: Response) {
    try {
      const data = await this.userAuthService.userSignup(userSignupDto);
      return res.status(data.status_code).json(data);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async adminLogin(@Body() loginAdminDto: AdminLoginDto, @Res() res) {
  //   try {
  //     const data = await this.adminservice.adminLogin(loginAdminDto);
  //     return res.status(data.status_code).json(data);
  //   } catch (error) {
  //     return res
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .json({ error: 'Internal server error' });
  //   }
  // }
}
