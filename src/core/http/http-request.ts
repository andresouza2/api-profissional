export interface HttpRequest<T = any> {
  body?: T
  params?: Record<string, string>
  query?: Record<string, string>
  headers?: Record<string, string>
  user?: {
    id: string
  }
}
