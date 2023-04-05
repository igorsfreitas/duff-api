import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table_name = 'beer_types';
export class addBeerTypesTable1680645651748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: table_name,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'min_temperature',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'max_temperature',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: "date('now')",
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: "date('now')",
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table_name);
  }
}
