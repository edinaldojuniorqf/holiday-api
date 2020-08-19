import { sub } from 'date-fns';

export default class GetDateGoodFridayService {
  public execute(dateEaster: Date): Date {
    return sub(dateEaster, {
      days: 2,
    });
  }
}
