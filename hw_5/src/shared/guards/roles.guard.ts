import {CanActivate, ExecutionContext, Injectable, SetMetadata} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const allowed = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!allowed || allowed.length === 0) return true;

    const { user } = ctx.switchToHttp().getRequest();

    return user && allowed.includes(user.role);
  }
}