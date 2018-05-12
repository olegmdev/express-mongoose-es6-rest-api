import mongoose from 'mongoose'
import util from 'util'
import config from 'config'

import app from './config/express'

// connect to mongo db
const mongoUri = config.get('mongo.host');
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.get('mongooseDebug')) {
  const debug = require('debug')('express-mongoose-es6-rest-api:index');

  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

export function start() {
  // listen on port config.port
  const port = config.get('port')
  const env = config.get('env')

  app.listen(port, () => {
    console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
  });
}

export default app;
