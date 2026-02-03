export interface HttpRequest<TBody = unknown, TParams = unknown, TQuery = unknown, THeaders = unknown> {
  body?: TBody
  params?: TParams
  query?: TQuery
  headers?: THeaders
}
