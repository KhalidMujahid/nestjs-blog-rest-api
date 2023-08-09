import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { IUser } from "../interfaces/user.interface";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  public registerUser(@Body() user: IUser): string {
    const result = this.authService.registerUser(user);
    if (result) {
      return "Account created!";
    } else {
      throw new HttpException(
        "An error occure while creating account",
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  @Post("login")
  public async loginUser(@Body() user: { email: string; password: string }) {
    const result = await this.authService.loginUser({ email: user.email });

    if (result) {
      // compare password
      if (result.password === user.password) {
        return result;
      } else {
        throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
    }
  }
}
