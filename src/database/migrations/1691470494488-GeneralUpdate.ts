import {MigrationInterface, QueryRunner} from "typeorm";

export class GeneralUpdate1691470494488 implements MigrationInterface {
    name = 'GeneralUpdate1691470494488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "dni" varchar NOT NULL, "direccion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" varchar PRIMARY KEY NOT NULL, "numero_factura" varchar NOT NULL, "tipo" varchar NOT NULL, "fecha" datetime NOT NULL, "monto_total" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "client_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "invoices_productos_products" ("invoicesId" varchar NOT NULL, "productsId" varchar NOT NULL, PRIMARY KEY ("invoicesId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_190f30810eebcdf56e08132952" ON "invoices_productos_products" ("invoicesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33f0efa92850c936dd23069c70" ON "invoices_productos_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "products_facturas_invoices" ("productsId" varchar NOT NULL, "invoicesId" varchar NOT NULL, PRIMARY KEY ("productsId", "invoicesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_afdb0a3efe0b33e25314d57de2" ON "products_facturas_invoices" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bff7046703650ac95bf127241" ON "products_facturas_invoices" ("invoicesId") `);
        // await queryRunner.query(`CREATE TABLE "temporary_users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar(2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "password" varchar NOT NULL)`);
        // await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at") SELECT "id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at" FROM "users"`);
        // await queryRunner.query(`DROP TABLE "users"`);
        // await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "id_categoria" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "nombre", "precio", "id_categoria", "created_at", "updated_at") SELECT "id", "nombre", "precio", "id_categoria", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_categories" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_categories"("id", "nombre", "created_at", "updated_at") SELECT "id", "nombre", "created_at", "updated_at" FROM "categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_categories" RENAME TO "categories"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at", "password") SELECT "id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at", "password" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_invoices" ("id" varchar PRIMARY KEY NOT NULL, "numero_factura" varchar NOT NULL, "tipo" varchar NOT NULL, "fecha" datetime NOT NULL, "monto_total" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "client_id" varchar, CONSTRAINT "FK_5534ba11e10f1a9953cbdaabf16" FOREIGN KEY ("client_id") REFERENCES "clients" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_invoices"("id", "numero_factura", "tipo", "fecha", "monto_total", "created_at", "updated_at", "client_id") SELECT "id", "numero_factura", "tipo", "fecha", "monto_total", "created_at", "updated_at", "client_id" FROM "invoices"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoices" RENAME TO "invoices"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "id_categoria" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_d5b8123a04ec41d0cbc65a1677f" FOREIGN KEY ("id_categoria") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "nombre", "precio", "id_categoria", "created_at", "updated_at") SELECT "id", "nombre", "precio", "id_categoria", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`DROP INDEX "IDX_190f30810eebcdf56e08132952"`);
        await queryRunner.query(`DROP INDEX "IDX_33f0efa92850c936dd23069c70"`);
        await queryRunner.query(`CREATE TABLE "temporary_invoices_productos_products" ("invoicesId" varchar NOT NULL, "productsId" varchar NOT NULL, CONSTRAINT "FK_190f30810eebcdf56e081329526" FOREIGN KEY ("invoicesId") REFERENCES "invoices" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_33f0efa92850c936dd23069c70a" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("invoicesId", "productsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_invoices_productos_products"("invoicesId", "productsId") SELECT "invoicesId", "productsId" FROM "invoices_productos_products"`);
        await queryRunner.query(`DROP TABLE "invoices_productos_products"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoices_productos_products" RENAME TO "invoices_productos_products"`);
        await queryRunner.query(`CREATE INDEX "IDX_190f30810eebcdf56e08132952" ON "invoices_productos_products" ("invoicesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33f0efa92850c936dd23069c70" ON "invoices_productos_products" ("productsId") `);
        await queryRunner.query(`DROP INDEX "IDX_afdb0a3efe0b33e25314d57de2"`);
        await queryRunner.query(`DROP INDEX "IDX_0bff7046703650ac95bf127241"`);
        await queryRunner.query(`CREATE TABLE "temporary_products_facturas_invoices" ("productsId" varchar NOT NULL, "invoicesId" varchar NOT NULL, CONSTRAINT "FK_afdb0a3efe0b33e25314d57de27" FOREIGN KEY ("productsId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0bff7046703650ac95bf127241b" FOREIGN KEY ("invoicesId") REFERENCES "invoices" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("productsId", "invoicesId"))`);
        await queryRunner.query(`INSERT INTO "temporary_products_facturas_invoices"("productsId", "invoicesId") SELECT "productsId", "invoicesId" FROM "products_facturas_invoices"`);
        await queryRunner.query(`DROP TABLE "products_facturas_invoices"`);
        await queryRunner.query(`ALTER TABLE "temporary_products_facturas_invoices" RENAME TO "products_facturas_invoices"`);
        await queryRunner.query(`CREATE INDEX "IDX_afdb0a3efe0b33e25314d57de2" ON "products_facturas_invoices" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bff7046703650ac95bf127241" ON "products_facturas_invoices" ("invoicesId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_0bff7046703650ac95bf127241"`);
        await queryRunner.query(`DROP INDEX "IDX_afdb0a3efe0b33e25314d57de2"`);
        await queryRunner.query(`ALTER TABLE "products_facturas_invoices" RENAME TO "temporary_products_facturas_invoices"`);
        await queryRunner.query(`CREATE TABLE "products_facturas_invoices" ("productsId" varchar NOT NULL, "invoicesId" varchar NOT NULL, PRIMARY KEY ("productsId", "invoicesId"))`);
        await queryRunner.query(`INSERT INTO "products_facturas_invoices"("productsId", "invoicesId") SELECT "productsId", "invoicesId" FROM "temporary_products_facturas_invoices"`);
        await queryRunner.query(`DROP TABLE "temporary_products_facturas_invoices"`);
        await queryRunner.query(`CREATE INDEX "IDX_0bff7046703650ac95bf127241" ON "products_facturas_invoices" ("invoicesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_afdb0a3efe0b33e25314d57de2" ON "products_facturas_invoices" ("productsId") `);
        await queryRunner.query(`DROP INDEX "IDX_33f0efa92850c936dd23069c70"`);
        await queryRunner.query(`DROP INDEX "IDX_190f30810eebcdf56e08132952"`);
        await queryRunner.query(`ALTER TABLE "invoices_productos_products" RENAME TO "temporary_invoices_productos_products"`);
        await queryRunner.query(`CREATE TABLE "invoices_productos_products" ("invoicesId" varchar NOT NULL, "productsId" varchar NOT NULL, PRIMARY KEY ("invoicesId", "productsId"))`);
        await queryRunner.query(`INSERT INTO "invoices_productos_products"("invoicesId", "productsId") SELECT "invoicesId", "productsId" FROM "temporary_invoices_productos_products"`);
        await queryRunner.query(`DROP TABLE "temporary_invoices_productos_products"`);
        await queryRunner.query(`CREATE INDEX "IDX_33f0efa92850c936dd23069c70" ON "invoices_productos_products" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_190f30810eebcdf56e08132952" ON "invoices_productos_products" ("invoicesId") `);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "id_categoria" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "products"("id", "nombre", "precio", "id_categoria", "created_at", "updated_at") SELECT "id", "nombre", "precio", "id_categoria", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "invoices" RENAME TO "temporary_invoices"`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" varchar PRIMARY KEY NOT NULL, "numero_factura" varchar NOT NULL, "tipo" varchar NOT NULL, "fecha" datetime NOT NULL, "monto_total" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "client_id" varchar)`);
        await queryRunner.query(`INSERT INTO "invoices"("id", "numero_factura", "tipo", "fecha", "monto_total", "created_at", "updated_at", "client_id") SELECT "id", "numero_factura", "tipo", "fecha", "monto_total", "created_at", "updated_at", "client_id" FROM "temporary_invoices"`);
        await queryRunner.query(`DROP TABLE "temporary_invoices"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar(2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()), "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at", "password") SELECT "id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at", "password" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME TO "temporary_categories"`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "categories"("id", "nombre", "created_at", "updated_at") SELECT "id", "nombre", "created_at", "updated_at" FROM "temporary_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_categories"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "precio" integer NOT NULL, "id_categoria" uuid NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "products"("id", "nombre", "precio", "id_categoria", "created_at", "updated_at") SELECT "id", "nombre", "precio", "id_categoria", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        // await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        // await queryRunner.query(`CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "ciudad" varchar NOT NULL, "provincia" varchar(2) NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "updated_at" timestamp NOT NULL DEFAULT (now()))`);
        // await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at") SELECT "id", "username", "email", "telefono", "ciudad", "provincia", "created_at", "updated_at" FROM "temporary_users"`);
        // await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP INDEX "IDX_0bff7046703650ac95bf127241"`);
        await queryRunner.query(`DROP INDEX "IDX_afdb0a3efe0b33e25314d57de2"`);
        await queryRunner.query(`DROP TABLE "products_facturas_invoices"`);
        await queryRunner.query(`DROP INDEX "IDX_33f0efa92850c936dd23069c70"`);
        await queryRunner.query(`DROP INDEX "IDX_190f30810eebcdf56e08132952"`);
        await queryRunner.query(`DROP TABLE "invoices_productos_products"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
