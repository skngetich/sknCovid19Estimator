import estimator from './estimator';

const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};

const expected = {
  data: input,
  impact: {
    currentlyInfected: 27470,
    infectionsByRequestedTime: 112517120,
    severeCasesByRequestedTime: 16877568,
    hospitalBedsByRequestedTime: -16639962,
    casesForICUByRequestedTime: 5625856,
    casesForVentilatorsByRequestedTime: 2250342,
    dollarsInFlight: 12484899635

  },
  severeImpact: {
    currentlyInfected: 137350,
    infectionsByRequestedTime: 562585600,
    severeCasesByRequestedTime: 84387840,
    hospitalBedsByRequestedTime: -84150234,
    casesForICUByRequestedTime: 28129280,
    casesForVentilatorsByRequestedTime: 11251712,
    dollarsInFlight: 62424498176

  }
};

describe('covid-19 estimator app', () => {
  describe('Check output object', () => {
    const output = estimator(input);

    test('Should march the expected object', () => {
      expect(output).toMatchObject(expected);
    });

    test('Should return data object', () => {
      expect(output.data).toEqual(input);
    });
    describe('should return impact object that:', () => {
      test(' has currently infected cases', () => {
        expect(output.impact).toHaveProperty('currentlyInfected', expect.any(Number));
        expect(output.impact.currentlyInfected).toEqual(expected.impact.currentlyInfected);
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
