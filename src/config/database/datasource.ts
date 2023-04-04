import { DataSource } from 'typeorm';
import { typeOrmConfig } from './sqlite.config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { entities: _, ...config } = typeOrmConfig;

export default new DataSource(config);
