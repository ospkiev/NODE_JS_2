import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  sign(payload: { userId: number; role: string }) {
    return this.jwt.sign(payload);
  }

  verify(token: string) {
    return this.jwt.verify(token);
  }
}