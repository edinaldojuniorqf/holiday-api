import {MigrationInterface, QueryRunner} from "typeorm";
import State from "../../../../modules/holidays/infra/typeorm/entities/State";

const states = [
  {
    name: 'Acre',
    cod: '12',
    uf: 'AC',
  },
  {
    name: 'Alagoas',
    cod: '27',
    uf: 'AL',
  },
  {
    name: 'Amapá',
    cod: '16',
    uf: 'AP',
  },
  {
    name: 'Amazonas',
    cod: '13',
    uf: 'AM',
  },
  {
    name: 'Bahia',
    cod: '29',
    uf: 'BA',
  },
  {
    name: 'Ceará',
    cod: '23',
    uf: 'CE',
  },
  {
    name: 'Distrito Federal',
    cod: '53',
    uf: 'DF',
  },
  {
    name: 'Espírito Santo',
    cod: '32',
    uf: 'ES',
  },
  {
    name: 'Goiás',
    cod: '52',
    uf: 'GO',
  },
  {
    name: 'Maranhão',
    cod: '21',
    uf: 'MA',
  },
  {
    name: 'Mato Grosso',
    cod: '51',
    uf: 'MT',
  },
  {
    name: 'Mato Grosso do Sul',
    cod: '50',
    uf: 'MS',
  },
  {
    name: 'Minas Gerais',
    cod: '31',
    uf: 'MG',
  },
  {
    name: 'Pará',
    cod: '15',
    uf: 'PA',
  },
  {
    name: 'Paraíba',
    cod: '25',
    uf: 'PB',
  },
  {
    name: 'Paraná',
    cod: '41',
    uf: 'PR',
  },
  {
    name: 'Pernambuco',
    cod: '26',
    uf: 'PE',
  },
  {
    name: 'Piauí',
    cod: '22',
    uf: 'PI',
  },
  {
    name: 'Rio de Janeiro',
    cod: '33',
    uf: 'RJ',
  },
  {
    name: 'Rio Grande do Norte',
    cod: '24',
    uf: 'RN',
  },
  {
    name: 'Rio Grande do Sul',
    cod: '43',
    uf: 'RS',
  },
  {
    name: 'Rondônia',
    cod: '11',
    uf: 'RO',
  },
  {
    name: 'Roraima',
    cod: '14',
    uf: 'RR',
  },
  {
    name: 'Santa Catarina',
    cod: '42',
    uf: 'SC',
  },
  {
    name: 'São Paulo',
    cod: '35',
    uf: 'SP',
  },
  {
    name: 'Sergipe',
    cod: '28',
    uf: 'SE',
  },
  {
    name: 'Tocantins',
    cod: '17',
    uf: 'TO',
  },
];

export class SeedStates1597700153274 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(State)
      .values(states)
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(State)
      .execute()
  }

}
