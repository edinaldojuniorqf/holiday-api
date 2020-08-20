import GetDateEasterService from '../GetDateEasterService';

let getDateEaster: GetDateEasterService

describe('getDateEaster', () => {
  beforeAll(() => {
    getDateEaster = new GetDateEasterService();
  })
  test('return the date correctily', () => {
    let dateEaster: Date;

    dateEaster = getDateEaster.execute(2020);
    expect(dateEaster.getDate()).toBe(12);
    expect(dateEaster.getMonth()).toBe(3);

    dateEaster = getDateEaster.execute(2019);
    expect(dateEaster.getDate()).toBe(21);
    expect(dateEaster.getMonth()).toBe(3);

    dateEaster = getDateEaster.execute(2000);
    expect(dateEaster.getDate()).toBe(23);
    expect(dateEaster.getMonth()).toBe(3);
  });
});
