import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

console.log('=== ENV VARIABLES DEBUG ===');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '***' : undefined);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('===========================');

const config = {
  name: 'database',
  connector: 'postgresql',
  url: process.env.DATABASE_URL || '',
  host: process.env.DB_HOST || process.env.PGHOST || 'db',
  port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432'),
  user: process.env.DB_USER || process.env.PGUSER || 'postgres',
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD || 'psql',
  database: process.env.DB_DATABASE || process.env.PGDATABASE || 'pizza',
};

@lifeCycleObserver('datasource')
export class DatabaseDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'database';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.database', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}