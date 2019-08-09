import amqp from 'amqplib';
import logger from './logger';

import config from './config';

const init = async () => {
  try {
    const connection = await amqp.connect(config.QUEUE);
    logger.info('Rabbit connected');

    const channel = await connection.createChannel();
    logger.info('Channel opened');

    await channel.assertQueue('hello');
    logger.info('Queue asserted');

    return channel;
  } catch (err) {
    return process.exit(1);
  }
};

export default init;
