import { defineConfig } from '@prisma/config';
import path from 'node:path';

const dbUrl = process.env.DATABASE_URL;

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: dbUrl,
  },
});
