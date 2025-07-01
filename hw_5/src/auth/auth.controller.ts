import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiBody} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @ApiBody({
    description: 'User login credentials',
    type: Object,
    examples: {
      example1: {
        value: { userId: 1, role: 'admin' },
        summary: 'Example of a user login',
      },
    },
  })
  @Post('login')
  login(@Body() body: { userId: number; role: string }) {
    return { access_token: this.auth.sign(body) };
  }
}