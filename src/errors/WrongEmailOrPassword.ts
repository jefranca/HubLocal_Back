class WrongEmailOrPassword extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WrongEmailOrPassword';
  }
}

export default WrongEmailOrPassword;