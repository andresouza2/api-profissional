import { describe, expect, it } from '@jest/globals'
import { Customer } from '@domain/entities/customer/customer.entity'
import { Address, Password } from '@domain/entities/customer/value-object'

describe('Customer Entity', () => {
  const validAddress = new Address({
    street: 'Rua dos Bobos',
    number: '171',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
    country: 'Brazil',
  })

  const validProps = Customer.create({
    name: 'John Doe',
    email: 'john-doe@gmail.com',
    document: '123.456.789-00',
    phone: '11999999999',
    address: validAddress,
    password: Password.fromHashed('hashed_password'),
  })

  it('should create a valid customer', () => {
    expect(validProps).toBeInstanceOf(Customer)
  })
  it("should issue an error message when validating the entity's data", () => {
    expect(() => {
      Customer.create({
        name: 'Jane Doe',
        email: '',
        document: '',
        phone: '',
        address: validAddress,
        password: Password.fromHashed('hashed_password'),
      })
    }).toThrow()
  })
})
