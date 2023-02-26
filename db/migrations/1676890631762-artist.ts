import { MigrationInterface, QueryRunner } from 'typeorm';

export class artist1676890631762 implements MigrationInterface {
  name = 'artist1676890631762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "artists"
                             (
                                 "id"     uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "name"   character varying NOT NULL,
                                 "grammy" boolean           NOT NULL,
                                 CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artists"`);
  }
}
