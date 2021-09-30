import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersTodoItemsTables1632992682253 implements MigrationInterface {
    name = 'UsersTodoItemsTables1632992682253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("todo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cbbb2cf9f31f6b57376f75b5a16" PRIMARY KEY ("todo_id"))`);
        await queryRunner.query(`CREATE TYPE "items_status_enum" AS ENUM('quero', 'comprei', 'cancelei', 'adiei')`);
        await queryRunner.query(`CREATE TYPE "items_prioridade_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TYPE "items_categoria_enum" AS ENUM('lazer', 'saude', 'moradia', 'eduação', 'carro', 'ventuario', 'beleza')`);
        await queryRunner.query(`CREATE TABLE "items" ("item_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "todo_id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying, "link_foto" character varying, "links_compra" jsonb NOT NULL DEFAULT '{}', "status" "items_status_enum" NOT NULL DEFAULT 'quero', "prioridade" "items_prioridade_enum" NOT NULL DEFAULT '4', "categoria" "items_categoria_enum" NOT NULL DEFAULT 'lazer', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d0249fbc104e3bd71b5a0ecf3b1" PRIMARY KEY ("item_id"))`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_306de35dee980b1fee9ff90aa0a" FOREIGN KEY ("todo_id") REFERENCES "todos"("todo_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_306de35dee980b1fee9ff90aa0a"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TYPE "items_categoria_enum"`);
        await queryRunner.query(`DROP TYPE "items_prioridade_enum"`);
        await queryRunner.query(`DROP TYPE "items_status_enum"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
