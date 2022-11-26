class EmaildDoesNotExist extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmaildDoesNotExist';
  }
}

export default EmaildDoesNotExist;