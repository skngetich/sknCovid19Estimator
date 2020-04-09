const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { getEstimate } = require('./controllers')

const app = express();


dotenv.config();


app.use(helmet());
app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/v1/covid-19/:dataFormat', getEstimate);


// Catch all routes
app.use('*', (_req, res, next) => {
  res.json({
    success: false,
    message: 'Resource not available'
  });
});


// Handle errors

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at ${port}`);
});
