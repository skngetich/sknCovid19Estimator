import convert from 'xml-js';
import covid19ImpactEstimator from '../estimator';

const options = { compact: true, ignoreComment: true, spaces: 4 };


module.exports = async function getJsonEstimate(estimate) {
  try {
    const estimateJson = await covid19ImpactEstimator(estimate);
    return await convert.json2xml(estimateJson, options);
  } catch (error) {
    throw Error(error);
  }
};
