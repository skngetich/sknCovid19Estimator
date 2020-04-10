const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const fs = require('fs');


const { getJson, getXml, getLogs } = require('./controllers');
const { schemas, validateBody } = require('./util');

const app = express();

app.use(express.static('db'));

dotenv.config();


app.use(helmet());
app.use(cors());

if (!fs.existsSync(path.join(__dirname, './db/access.log'))) {
  fs.mkdirSync('./dist/db');
}

const accessLogStream = fs.createWriteStream(path.join(__dirname, './db/access.log'), { flags: 'a+' });


app.use(morgan(':method\t\t:url\t\t:status\t\t:response-time ms', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/v1/covid-19/logs', getLogs);
app.post('/api/v1/covid-19/json', validateBody(schemas.input), getJson);
app.post('/api/v1/covid-19/xml', validateBody(schemas.input), getXml);


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
