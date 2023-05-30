require('dotenv').config()
const { connect, connection } = require('mongoose');

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;