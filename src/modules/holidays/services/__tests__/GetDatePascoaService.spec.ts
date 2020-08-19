import GetDateEasterService from '../GetDateEasterService';

let getDateEaster: GetDateEasterService

describe('getDateEaster', () => {
  beforeAll(() => {
    getDateEaster = new GetDateEasterService();
  })
  test('return the date correctily', () => {
    const date = new Date(12, 3, 2020, 0, 0, 0);
    const dateEaster = getDateEaster.execute(2020);
    
    expect(dateEaster.getDate()).toBe(date.getDate());
    expect(dateEaster.getMonth()).toBe(date.getMonth());
  });
});
