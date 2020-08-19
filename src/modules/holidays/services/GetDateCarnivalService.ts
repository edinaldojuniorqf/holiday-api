import { sub } from 'date-fns';

export default class GetDateCarnivalService {
  public execute(dateEaster: Date): Date {
    return sub(dateEaster, {
      days: 47,
    });
  }
}
