const covid19Estimator = require('../estimator');

module.exports = async function getJsonEstimate(estimate) {
  return covid19Estimator(estimate);
};
