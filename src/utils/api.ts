export type SuccessResponse<T> = {
  ok: T | true
}

export type ErrorResponse = {
  error: string
}

export type Response<T> = SuccessResponse<T> | ErrorResponse

export function sendSuccessResponse<T>(response?: T): SuccessResponse<T> {
  return {
    ok: response ?? true
  }
}

export function sendErrorResponse(error: string): ErrorResponse {
  return {
    error
  }
}
