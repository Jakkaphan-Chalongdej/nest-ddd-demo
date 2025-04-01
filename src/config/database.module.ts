import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 5432),
          username: config.get('DB_USERNAME', 'postgres'),
          password: config.get('DB_PASSWORD', 'root'),
          database: config.get('DB_DATABASE', 'doc_connect'),
          logging: config.get('DB_LOGGING', false),
          entities: [__dirname + '/../**/*.orm-entity.{ts,js}'],
          autoLoadEntities: true,
          migrations: [join(__dirname, '..', 'migrations', '*.ts')],
          cli: {
            migrationsDir: join(__dirname, '..', 'migrations'),
          },
          synchronize: config.get('DB_SYNCHRONIZE', true),
          migrationsRun: config.get('DB_MIGRATIONS_RUN', false),
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
