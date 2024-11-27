/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'; // Prisma Client
import { Server } from 'http';
import app from './app';
import config from './config';

// Initialize Prisma Client
const prisma = new PrismaClient();

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// Handle graceful shutdown for Prisma
// process.on('SIGTERM', async () => {
//     console.log('SIGTERM is received');
//     if (server) {
//         server.close();
//     }
//     await prisma.$disconnect();
// });
