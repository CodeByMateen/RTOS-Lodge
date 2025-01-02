import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";

export class UserSignupDto {
  @ApiProperty({ example: "First Name" })
  @IsNotEmpty({ message: "First name is required" })
  @IsString({ message: "First name must be a string" })
  first_name: string;

  @ApiProperty({ example: "Last Name" })
  @IsNotEmpty({ message: "Last name is required" })
  @IsString({ message: "Last name must be a string" })
  last_name: string;

  @ApiProperty({ example: "user@gmail.com" })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({ example: "Test@123" })
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long",
    },
  )
  password: string;

  @ApiProperty({ example: "1234567890" })
  @IsNotEmpty({ message: "Phone number is required" })
  @IsString({ message: "Phone number must be a string" })
  phone_number: string;
}
