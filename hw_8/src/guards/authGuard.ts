import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('AuthGuard');
    const request = context.switchToHttp().getRequest();
    const isAuth = request.headers.authorization === 'secret';
    if (!isAuth) {
      throw new UnauthorizedException('Not Authorized');
    }
    return isAuth;
  }
}
