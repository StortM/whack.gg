import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { sendSuccessResponse, SuccessResponse } from './api'

@Injectable()
export class ResultInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SuccessResponse<T>> {
    return next.handle().pipe(map((data) => sendSuccessResponse(data)))
  }
}
