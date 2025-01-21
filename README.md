## RTOS-Lodge 

Real-Time Optimization System for dynamic lodging solutions. Built for efficiency and scalability.

## To Install NestJS Globally

```bash
$ npm install -g @nestjs/cli
```

## Project setup

```bash
$ npm install
```

# Manually Installing Dependencies

## Install Config Module

```bash
$ npm install @nestjs/config
```

## Install Bcrypt Service

```bash
$ npm install bcrypt
```

## Install JWT Service

```bash
$ npm install @nestjs/jwt
```

## To Generate JWT Secret With 32 Characters
You can generate 32, 64, 128 and 256 characters secret key.

```bash
$ openssl rand -base64 32
```
OR 
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
OR For 32 Characters
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
OR In Python
```
import secrets
print(secrets.token_urlsafe(32))
```

## Install Dotenv Service

```bash
$ npm install dotenv
```

## Install Helmet Service

```bash
$ npm install helmet
```

## Install Swagger Service

```bash
$ npm install @nestjs/swagger swagger-ui-express
```

## Install Class Validator and Transformer

```bash
$ npm install class-validator class-transformer
```

## Install Prisma and Dependencies:

```bash
$ npm install @prisma/client
$ npm install prisma --save-dev
```

## Initialize Prisma

```bash
$ npx prisma init
```

## Generate Prisma

Whenever you add new table and to reflect table changes in your code, use the command below

```bash
$ npx prisma generate
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
