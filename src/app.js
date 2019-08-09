import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import koaLogger from 'koa-logger';
import helmet from 'koa-helmet';

import config from './config';
import error from './error';
import logger from './logger';
import router from './router';

const init = (channel) => {
  const app = new Koa();

  app.use(helmet());
  app.use(bodyParser());
  app.use(cors());
  app.use(koaLogger());
  app.use(error);

  app.context.channel = channel;

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(config.PORT, () => {
    Object.keys(config).map((key) => logger.info(`${key}: ${config[key]}`));
  });
};

export default init;
