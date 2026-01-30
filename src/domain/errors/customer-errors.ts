export class CustomerAlreadyExistsError extends Error {
  constructor() {
    super(`Erro ao criar cliente: verifique os dados e tente novamente`)
    this.name = 'CustomerAlreadyExistsError'
  }
}
