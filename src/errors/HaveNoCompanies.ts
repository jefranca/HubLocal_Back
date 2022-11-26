class HaveNoCompanies extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HaveNoCompanies';
  }
}

export default HaveNoCompanies;