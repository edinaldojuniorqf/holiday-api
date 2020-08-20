export default class GetHolidayMovableNameService {
  public execute(slug: string) {
    switch (slug) {
      case 'carnaval':
        return 'Carnaval';
      case 'corpus-christi':
        return 'Corpus Christi';
      default:
        return slug;
    }
  }
}
