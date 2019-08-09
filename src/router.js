import KoaRouter from 'koa-router';
import mongoose from 'mongoose';

import logger from './logger';

const router = KoaRouter();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Koa + MongoDB + RabbitMQ' };
});

router.get('/healthz', async (ctx) => {
  const { channel } = ctx;

  await mongoose.connection.db.admin().ping();

  await channel.checkQueue('hello');

  ctx.body = 'OK';
});

router.get('/queue', async (ctx) => {
  const { channel } = ctx;

  const message = 'Hello World';

  await channel.sendToQueue('hello', Buffer.from(message));
  logger.info('Message sent');

  ctx.body = 'OK';
});

export default router;
