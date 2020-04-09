
const Output = function ({
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation,
  periodType,
  timeToElapse,
  reportedCases,
  totalHospitalBeds,
  estimationFactor
}) {
  this.periodType = periodType;
  this.timeToElapse = timeToElapse;
  this.reportedCases = reportedCases;
  this.totalHospitalBeds = totalHospitalBeds;
  this.avgDailyIncomePopulation = avgDailyIncomePopulation;
  this.avgDailyIncomeInUSD = avgDailyIncomeInUSD;
  this.estimationFactor = estimationFactor;
};
/* eslint-disable consistent-return */

Output.prototype.convertToDays = function () {
  if (this.periodType === 'days' || this.periodType === 'day') {
    return this.timeToElapse;
  }
  if (this.periodType === 'weeks' || this.periodType === 'week') {
    return this.timeToElapse * 7;
  }
  if (this.periodType === 'months' || this.periodType === 'month') {
    return this.timeToElapse * 30;
  }
};

Output.prototype.rateOfInfection = function () {
  const days = this.convertToDays / 3;
  // eslint-disable-next-line no-bitwise
  return 2 ** days | 0;
};

Output.prototype.currentlyInfected = function () {
  return this.reportedCases * this.estimationFactor;
};
Output.prototype.infectionsByRequestedTime = function () {
  return this.currentlyInfected() * this.estimationFactor;
};
Output.prototype.severeCasesByRequestedTime = function () {
  // eslint-disable-next-line no-bitwise
  return (this.currentlyInfected() * 0.15) | 0;
};
Output.prototype.hospitalBedsByRequestedTime = function () {
  return this.totalHospitalBeds * this.severeCasesByRequestedTime();
};

Output.prototype.casesForICUByRequestedTime = function () {
  // eslint-disable-next-line no-bitwise
  return (this.severeCasesByRequestedTime() * 0.05) | 0;
};

Output.prototype.casesForVentilatorsByRequestedTime = function () {
  return this.infectionsByRequestedTime() * 0.02;
};
Output.prototype.dollarsInFlight = function () {
  return this.infectionsByRequestedTime()
  * this.avgDailyIncomePopulation
  * this.avgDailyIncomeInUSD
  * this.convertToDays();
};


Output.prototype.results = function () {
  return {
    currentlyInfected: this.currentlyInfected(),
    infectionsByRequestedTime: this.infectionsByRequestedTime(),
    severeCasesByRequestedTime: this.severeCasesByRequestedTime(),
    hospitalBedsByRequestedTime: this.hospitalBedsByRequestedTime(),
    casesForICUByRequestedTime: this.casesForICUByRequestedTime(),
    casesForVentilatorsByRequestedTime: this.casesForVentilatorsByRequestedTime(),
    dollarsInFlight: this.dollarsInFlight()

  };
};

const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;


  const impact = new Output({
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    estimationFactor: 10
  });

  const severeImpact = new Output({
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    estimationFactor: 50
  });

  return {
    data,
    impact: impact.results(),
    severeImpact: severeImpact.results()
  };
};

module.exports = covid19ImpactEstimator;
