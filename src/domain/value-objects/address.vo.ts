export interface AddressProps {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export class Address {
  private readonly props: AddressProps

  constructor(props: AddressProps) {
    this.validate(props)
    this.props = { ...props }
    Object.freeze(this)
  }

  validate(props: AddressProps): void {
    if (!props.street?.trim()) throw new Error('Street is required')
    if (!props.number?.trim()) throw new Error('Number is required')
    if (!props.neighborhood?.trim()) throw new Error('Neighborhood is required')
    if (!props.city?.trim()) throw new Error('City is required')
    if (!props.state?.trim()) throw new Error('State is required')
    if (!props.zipCode?.match(/^\d{5}-?\d{3}$/)) throw new Error('Zip invalid')
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
      this.props.zipCode === other.props.zipCode
    )
  }

  toValue(): AddressProps {
    return { ...this.props }
  }
}
