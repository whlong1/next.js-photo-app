# Prisma Setup Guide

This guide covers the basic set up for Prisma with a PostgreSQL database. The guide is based on the following resources:

- [Prisma Setup From Scratch](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started)
- [Instantiating PrismaClient ](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- [Prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

## Database

At this stage, we are opting to use a Postgres database hosted by Vercel. If you are starting from scratch, you'll need to create a new Postgres database through [Vercel Storage](https://vercel.com/docs/storage).

Please note, this might change if we decide to switch to AWS. 

## Prisma Setup

1. Run the following command in your terminal:

    ```bash
    npx prisma init
    ```
    This command creates:
    - A new directory called `prisma` containing `schema.prisma` file.
    - A `.env` file in the root directory of the project.

2. Add the following to `prisma/schema.prisma`:

    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("POSTGRES_PRISMA_URL") // uses connection pooling
      directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
    }

    model Greeting {
      id        Int      @id @default(autoincrement())
      text      String
      sentiment String
      recipient String
      updatedAt DateTime @updatedAt
      createdAt DateTime @default(now())
    }
    ```

3. Update the `.env` with the following variables:

    ```text
    POSTGRES_URL="****"
    POSTGRES_PRISMA_URL="****"
    POSTGRES_URL_NON_POOLING="****"
    POSTGRES_USER="****"
    POSTGRES_HOST="****"
    POSTGRES_PASSWORD="****"
    POSTGRES_DATABASE="****"
    ```

## Migrations

Run the following command to create an initial migration:

  ```bash
  npx prisma migrate dev --name "init"
  ```

## Instantiate the PrismaClient 

1. Run the following command:
    ```bash
    touch src/lib/db.ts
    ```

2. Add the following to `src/lib/db.ts`:
    ```ts
    import { PrismaClient } from '@prisma/client'

    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined
    }

    export const prisma = globalForPrisma.prisma ?? new PrismaClient()

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    ```

3. Now the PrismaClient can be imported like so:
    ```tsx
    import { prisma } from "@/lib/db"
    ```

## Prisma Commands 

- To reset the database:

    ```bash
    npx prisma migrate reset
    ```

- To run existing migrations:

    ```bash
    npx prisma migrate dev
    ```

## Troubleshooting

Vercel Postgres is currently in beta. See known issues below:

- [Vercel starter code migration issue](https://github.com/prisma/prisma/issues/19234)
