import { prisma } from '@/lib/prisma'

import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import type { Environment } from 'vitest/environments'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not found.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const environment: Environment = {
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL
    console.log(process.env.DATABASE_URL)

    execSync('npx prisma db push')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}

export default environment
