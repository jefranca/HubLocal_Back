class AccountDuplicated extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AccountDuplicated';
  }
}

export default AccountDuplicated;