import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ValidationError
} from '@nestjs/common'
import { sendErrorResponse } from './api'

type ResponseException = {
  response:
    | {
        statusCode: number
        message: ValidationError[] | string
        error: string
      }
    | string
}

const formatValidationErrors = (valErrors: ValidationError[]) =>
  valErrors
    .map((m) =>
      typeof m === 'string'
        ? m
        : `Field "${m.property}" failed to validate. Errors: ${Object.values(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            m.constraints!
          ).join('. ')}`
    )
    .join('\n')

@Catch()
export class CatchAllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error | ResponseException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse()
    let error
    if ('response' in exception) {
      const res = exception.response
      if (typeof res !== 'string') {
        const msg = res.message
        error = typeof msg === 'string' ? msg : formatValidationErrors(msg)
      } else {
        error = res
      }
    } else {
      error = exception.message
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json(sendErrorResponse(error))
  }
}
