const Joi = require('@hapi/joi');


// An alternative way to export different functions in the module
module.exports = {

  validateBody: (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message);

      res.status(422).json({ error: message });
    }
  },
  schemas: {
    input: Joi.object({
      region: Joi.object().keys({
        name: Joi.string().required(),
        avgAge: Joi.number(),
        avgDailyIncomeInUSD: Joi.number().required(),
        avgDailyIncomePopulation: Joi.number().required()
      }),
      periodType: Joi.string().valid(...['days', 'weeks', 'months']).required(),
      timeToElapse: Joi.number().required(),
      reportedCases: Joi.number().required(),
      population: Joi.number().required(),
      totalHospitalBeds: Joi.number().required()

    })


  }

};
