import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProducts1668147284038 implements MigrationInterface {
    name = 'CreateProducts1668147284038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "id_categoria" varchar)`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at") SELECT "id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "id_categoria" varchar, CONSTRAINT "FK_d5b8123a04ec41d0cbc65a1677f" FOREIGN KEY ("id_categoria") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "nombre", "precio", "created_at", "updated_at", "id_categoria") SELECT "id", "nombre", "precio", "created_at", "updated_at", "id_categoria" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "id_categoria" varchar)`);
        await queryRunner.query(`INSERT INTO "products"("id", "nombre", "precio", "created_at", "updated_at", "id_categoria") SELECT "id", "nombre", "precio", "created_at", "updated_at", "id_categoria" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar(2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at") SELECT "id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
