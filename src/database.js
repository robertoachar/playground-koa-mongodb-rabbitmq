import mongoose from 'mongoose';

import config from './config';
import logger from './logger';

const init = async () => {
  mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected!');
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected!');
    process.exit(1);
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB Error!', err.message);
    process.exit(1);
  });
};

export default init;
