import app from './app';
import database from './database';
import queue from './queue';

(async () => {
  await database();

  const channel = await queue();

  await app(channel);
})();
