import { DataSource } from "typeorm";

export const MainDs = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: undefined,
  database: 'money_saver',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: []
})