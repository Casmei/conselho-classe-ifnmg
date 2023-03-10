import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { userRoles } from 'src/module/user/protocols/user.protocols';
import { ROLE_KEY } from '../decorators/verify-role.decorator';

@Injectable()
export default class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const roles = this.reflector.getAllAndOverride<userRoles[]>(ROLE_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);

    // if (!roles) {
    //   const params = context.switchToHttp().getRequest();
    //   console.log('🚀 ~ params', params);
    //   return true;
    // }
    // pODER USAR O ROLE GUARD QUANDO TRABALHAR NO CONTEXTO DA INSTITUIÇÃO
    return true;
  }
}
