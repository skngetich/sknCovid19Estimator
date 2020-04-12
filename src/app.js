const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const fs = require('fs');


const { getJson, getXml, getLogs } = require('./controllers');
const { schemas, validateBody } = require('./util');

const app = express();
app.use(compression());
app.use(express.static('db'));

dotenv.config();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync(path.join(__dirname, './db/access.log'))) {
  fs.mkdirSync('./dist/db');
}


const accessLogStream = fs.createWriteStream(path.join(__dirname, './db/access.log'), { flags: 'a+' });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.type('html').sendFile(path.join(`${__dirname}/public/index.html`));
});
morgan.token('response-time-ms', function getResponse(req, res) {
  const time = this['response-time'](req, res, 0) < 10 ? `0${this['response-time'](req, res, 0)}ms` : `${this['response-time'](req, res, 0)}ms`;
  return time;
});
app.use(morgan(':method\t:url\t:status\t:response-time-ms', { stream: accessLogStream }));


app.post('/api/v1/on-covid-19/', validateBody(schemas.input), getJson);
app.get('/api/v1/on-covid-19/logs', getLogs);
app.post('/api/v1/on-covid-19/json', validateBody(schemas.input), getJson);
app.post('/api/v1/on-covid-19/xml', validateBody(schemas.input), getXml);


// Catch all routes
app.use('*', (_req, res) => {
  res.json({
    success: false,
    message: 'Resource not available'
  });
});

// Handle errors

app.use((err, _req, res) => {
  res.status(err.status || 500);
  res.json({ error: err });
});
const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at ${port}`);
});
