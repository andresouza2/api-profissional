import { HttpResponse } from './HttpResponse'

export function ok<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 200,
    body,
  }
}
export function created<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 201,
    body,
  }
}
export function noContent(): HttpResponse {
  return {
    statusCode: 204,
  }
}
export function badRequest<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 400,
    body,
  }
}
export function unauthorized<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 401,
    body,
  }
}
export function notFound<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 404,
    body,
  }
}
export function serverError<T>(body: T): HttpResponse<T> {
  return {
    statusCode: 500,
    body,
  }
}
