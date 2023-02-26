import { MigrationInterface, QueryRunner } from 'typeorm';

export class favorites1676901208659 implements MigrationInterface {
  name = 'favorites1676901208659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artists"
        ADD "isFavorite" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "albums"
        ADD "isFavorite" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "tracks"
        ADD "isFavorite" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tracks"
        DROP COLUMN "isFavorite"`);
    await queryRunner.query(`ALTER TABLE "albums"
        DROP COLUMN "isFavorite"`);
    await queryRunner.query(`ALTER TABLE "artists"
        DROP COLUMN "isFavorite"`);
  }
}
