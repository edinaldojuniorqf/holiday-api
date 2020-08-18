import getDayPascoa from '../getDatePascoa';
import getdatePascoa from '../getDatePascoa';

describe('getDatePascoa', () => {
  test('return the day correctily', () => {
    const date = new Date(12, 3, 2020, 0, 0, 0);
    const datePascoa = getdatePascoa(2020);
    
    expect(datePascoa.getDate()).toBe(date.getDate());
    expect(datePascoa.getMonth()).toBe(date.getMonth());
  });
});
