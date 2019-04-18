// import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoose = require('mongoose');
// const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql');

// import required files
const router = require('./router');

// set the port of the server
const PORT = process.env.PORT || process.env.NODE_PORT || 8080;

// set the JWT secret for the app
// const JWT_TOKEN = process.env.JWT_TOKEN || 'mysecretshhhh';

// set the URI for connecting to database
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/project2';

// connect to the database
mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (err) throw err;
});

// create express app and connect middleware
const app = express();
app.disable('x-powered-by');
app.use('/', express.static(path.resolve(`${__dirname}/../client/dist`)));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// route server requests through helper js file
router(app);
app.use('/api', router);

// serve react build
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

// start sever
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on 127.0.0.1:${PORT}.`);
});
