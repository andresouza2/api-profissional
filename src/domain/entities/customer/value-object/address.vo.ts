import { InvalidAddressError } from '../errors'

export interface AddressProps {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class Address {
  private readonly props: AddressProps

  constructor(props: AddressProps) {
    this.validate(props)
    this.props = { ...props }
    Object.freeze(this)
  }

  validate(props: AddressProps): void {
    const violations: string[] = []

    if (!props.street?.trim()) violations.push('Street is required')

    if (!props.number?.trim()) violations.push('Number is required')

    if (!props.neighborhood?.trim()) violations.push('Neighborhood is required')

    if (!props.city?.trim()) violations.push('City is required')

    if (!props.state?.trim()) violations.push('State is required')

    if (!props.zipCode?.match(/^\d{5}-?\d{3}$/)) violations.push('Zip invalid')

    if (!props.country?.trim()) violations.push('Country is required')

    if (violations.length > 0) {
      throw new InvalidAddressError(violations)
    }
  }

  equals(other: Address): boolean {
    if (!other) return false

    return (
      this.props.street === other.props.street &&
      this.props.number === other.props.number &&
      this.props.complement === other.props.complement &&
      this.props.neighborhood === other.props.neighborhood &&
      this.props.city === other.props.city &&
      this.props.state === other.props.state &&
      this.props.zipCode === other.props.zipCode &&
      this.props.country === other.props.country
    )
  }

  toValue(): AddressProps {
    return { ...this.props }
  }
}
