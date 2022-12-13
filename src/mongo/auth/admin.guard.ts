import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

//Used with JWT guard to allow only admin access to endpoint.
//Should be added before the JWT guard declaration.
@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    return request.user && request.user.isAdmin
  }
}
