import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateHolidays1597700143492 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'holidays',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'county_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'state_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      })
    );

    await queryRunner.createForeignKey(
      'holidays',
      new TableForeignKey({
        name: 'HolidaysCounties',
        columnNames: ['county_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'counties',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'holidays',
      new TableForeignKey({
        name: 'HolidaysStates',
        columnNames: ['state_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'states',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('holidays', 'HolidaysCounties');
    await queryRunner.dropForeignKey('holidays', 'HolidaysStates');
    await queryRunner.dropTable('holidays');
  }

}
