import 'dotenv/config'

import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};

export const db = knex(config);
