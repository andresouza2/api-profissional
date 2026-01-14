import { randomUUID } from "node:crypto";

export class UniqueEntityId {
  private readonly value: string

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  toString(): string {
    return this.value?.toString();
  }

  toValue(): string {
    return this.value;
  }

  toEquals(id: UniqueEntityId): boolean {
    if (!(id instanceof UniqueEntityId)) {
      return false;
    }

    return this.value === id.value;
  }
}