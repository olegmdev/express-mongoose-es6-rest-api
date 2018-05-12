// module.parent check is required to support mocha watch
if (!module.parent) {
  require('dotenv/config')
}

const app = require('./app');
app.start();

module.exports = app;
