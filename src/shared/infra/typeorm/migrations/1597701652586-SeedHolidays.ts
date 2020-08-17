import {MigrationInterface, QueryRunner} from "typeorm";
import Holiday, { HolidayType } from "../../../../modules/holidays/infra/typeorm/entities/Holiday";

const holidays = [
  {
    name: 'Ano Novo',
    type: HolidayType.National,
    day: 1,
    month: 1,
  },
  {
    name: 'Tiradentes',
    type: HolidayType.National,
    day: 21,
    month: 4,
  },
  {
    name: 'Dia do Trabalhador',
    type: HolidayType.National,
    day: 1,
    month: 5,
  },
  {
    name: 'Independência',
    type: HolidayType.National,
    day: 7,
    month: 9,
  },
  {
    name: 'Nossa Senhora Aparecida',
    type: HolidayType.National,
    day: 12,
    month: 10,
  },
  {
    name: 'Finados',
    type: HolidayType.National,
    day: 2,
    month: 11,
  },
  {
    name: 'Proclamação da República',
    type: HolidayType.National,
    day: 15,
    month: 11,
  },
  {
    name: 'Natal',
    type: HolidayType.National,
    day: 25,
    month: 12,
  }
]

export class SeedHolidays1597701652586 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(Holiday)
      .values(holidays)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(Holiday)
      .execute()
  }

}
