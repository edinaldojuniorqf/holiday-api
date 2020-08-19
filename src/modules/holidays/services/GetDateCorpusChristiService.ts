import { add } from 'date-fns';

export default class GetDateCorpusChristiService {
  public execute(dateEaster: Date): Date {
    return add(dateEaster, {
      days: 60,
    });
  }
}
