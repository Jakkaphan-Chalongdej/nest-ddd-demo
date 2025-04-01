import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_LOGGING: Joi.boolean().default(false),
        DB_MIGRATIONS_RUN: Joi.boolean().default(false),
        BASIC_USER: Joi.string().default('admin'),
        BASIC_PASS: Joi.string().default('password'),
        SWAGGER_USER: Joi.string().default('admin'),
        SWAGGER_PASS: Joi.string().default('password'),
      }),
    }),
  ],
})
export class ConfigModule {}
