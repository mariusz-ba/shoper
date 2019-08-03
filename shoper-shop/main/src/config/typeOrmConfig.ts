import { ConnectionOptions } from 'typeorm';

export const typeOrmConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'shoper',
  password: 'shoper',
  database: 'shoper',
  synchronize: true,
  logging: false,
  migrations: [__dirname + '/../migrations/**/*.{ts,js}'],
  entities: [__dirname + '/../entities/**/*.{ts,js}']
};
