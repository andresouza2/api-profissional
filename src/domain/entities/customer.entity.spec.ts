import { describe, expect, it } from '@jest/globals'
import { Address } from '../../core/value-objects/address.vo'
import { Customer } from './customer.entity'

describe('Customer Entity', () => {
  const validAddress = new Address({
    street: 'Rua dos Bobos',
    number: '171',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
  })

  const validProps = new Customer({
    name: 'John Doe',
    email: 'john-doe@gmail.com',
    document: '123.456.789-00',
    phone: '11999999999',
    address: validAddress,
  })

  it('should create a valid customer', () => {
    expect(validProps).toBeInstanceOf(Customer)
  })
  it("should issue an error message when validating the entity's data", () => {
    expect(() => {
      new Customer({
        name: 'Jane Doe',
        email: '',
        document: '',
        phone: '',
        address: validAddress,
      })
    }).toThrow()
  })
})
