/* eslint no-process-env: 0 */

import dotenv from 'dotenv';

dotenv.config();

const environment = ['NODE_ENV', 'DATABASE', 'QUEUE', 'PORT'];

environment.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

const config = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE: process.env.DATABASE,
  QUEUE: process.env.QUEUE,
  PORT: process.env.PORT
};

export default config;
