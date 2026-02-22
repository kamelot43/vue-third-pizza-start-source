import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';


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