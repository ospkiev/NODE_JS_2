import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers['authorization'] || '';
    const token  = header.replace('Bearer ', '');

    try {
      req.user = this.auth.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}