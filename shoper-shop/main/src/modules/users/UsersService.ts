interface Address {
  id: number;
  streetNr: string;
  streetName: string;
  additionalAddress?: string;
  town: string;
  zipCode: string;
  country: string;
}

export class UsersService {
  getUserAddresses(userId: number): { billing: Address[], delivery: Address[] } {
    const address: Address = {
      id: 1,
      streetNr: '25/L1',
      streetName: 'Zabłocie',
      town: 'Kraków',
      zipCode: '30-701',
      country: 'Polska'
    };

    return {
      billing: [address],
      delivery: [address]
    };
  }
}
