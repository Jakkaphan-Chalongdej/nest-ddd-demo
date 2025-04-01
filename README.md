## Description

Create a project structure using the DDD (Domain Driven Design) concept.
NestJS + TypeORM + PostgreSQL + Swagger + JWT

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Environment

- COMMON

  | Keys       | Example | Desc                                                                 |
  | ---------- | ------- | -------------------------------------------------------------------- |
  | PREFIX_API | api     | API Prefix "http://localhost:{PORT}/api". ( Default PREFIX_API api ) |
  | PORT       | 3001    | Setup port for running api service. ( Default PORT 3000 )            |

- DATABASE

  | Keys           | Example   | Desc                                       |
  | -------------- | --------- | ------------------------------------------ |
  | DB_HOST        | 127.0.0.1 | host for accessing the database.           |
  | DB_PORT        | 5432      | port for accessing the database.           |
  | DB_USERNAME    | xxxx      | username for accessing the database.       |
  | DB_PASSWORD    | xxxx      | password for accessing the database.       |
  | DB_DATABASE    | demo      | database name.                             |
  | DB_LOGGING     | false     | Database call query record. (true , false) |
  | DB_SYNCHRONIZE | false     | sync database with entity. (true , false)  |

- SWAGGER
- URL: http://localhost:{PORT}/api/docs

  | Keys         | Example | Desc                                      |
  | ------------ | ------- | ----------------------------------------- |
  | SWAGGER_USER | admin   | Username for accessing API documentation. |
  | SWAGGER_PASS | admin   | Password for accessing API documentation. |

- JWT

  | Keys       | Example         | Desc                               |
  | ---------- | --------------- | ---------------------------------- |
  | JWT_SECRET | d33b934d315c... | Generate With openssl rand -hex 32 |
