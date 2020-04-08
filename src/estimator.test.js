import estimator from './estimator';

const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

describe('covid-19 estimator app', () => {
  describe('Check output object', () => {
    const output = estimator(input);

    test('Should return data object', () => {
      expect(output.data).toEqual(input);
    });
    describe('should return impact object that:', () => {
      test(' has currently infected cases', () => {
        expect(output.impact).toHaveProperty('currentlyInfected', expect.any(Number));
      });
      test(' has number of infected by requested time cases', () => {
        expect(output.impact).toHaveProperty('infectionsByRequestedTime', expect.any(Number));
        expect(output.impact.infectionsByRequestedTime).not.toBeNaN();
      });
      test(' has number of severe positive cases that will require ICU care', () => {
        expect(output.severeImpact).toHaveProperty('casesForICUByRequestedTime', expect.any(Number));
      });
      test('number of severe positive cases that will require ventilators', () => {
        expect(output.severeImpact).toHaveProperty('casesForVentilatorsByRequestedTime', expect.any(Number));
      });
      test('number of severe dollarsInFlight', () => {
        expect(output.severeImpact).toHaveProperty('dollarsInFlight', expect.any(Number));
      });
    });
    describe('should return severeImpact object that:', () => {
      test(' has currently severe infected cases', () => {
        expect(output.severeImpact).toMatchObject({ currentlyInfected: expect.any(Number) });
      });
      test(' has number of severe infected by  requested time cases', () => {
        expect(output.severeImpact.infectionsByRequestedTime).not.toBeNaN();
      });
      test(' has number of severe cases By requested Time', () => {
        expect(typeof output.severeImpact.hospitalBedsByRequestedTime).toBe('number');
      });
      test(' has number of available cases By requested Time', () => {
        expect(output.severeImpact).toHaveProperty('hospitalBedsByRequestedTime', expect.any(Number));
        expect(output.severeImpact.hospitalBedsByRequestedTime).not.toBeNaN();
      });
      test(' has number of severe positive cases that will require ICU care', () => {
        expect(output.severeImpact).toHaveProperty('casesForICUByRequestedTime', expect.any(Number));
      });
      test('number of severe positive cases that will require ventilators', () => {
        expect(output.severeImpact).toHaveProperty('casesForVentilatorsByRequestedTime', expect.any(Number));
      });
      test('number of severe dollarsInFlight', () => {
        expect(output.severeImpact).toHaveProperty('dollarsInFlight', expect.any(Number));
      });
    });
  });
});
