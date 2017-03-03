const should = require('chai').should();
require('./assertionWithinExpectedTolerance');

const EXPECTEED_TOLERANCE = 8;

const DATE_TYPE_FIELDS = [
  'birthDate',
  'convictionDate',
  'sentenceDate',
  'firstSanctionDate',
  'assessmentDate',
  'mostRecentSexualOffence'
];

const OUTPUT_TYPE_FIELDS = [
  'output_sv_static',
  'output_sv_dynamic',
  'output_male_sex',
  'output_non_sex',
  'output_female_sex',
  'output_rsr_best'
];

// fixture generators

const parseDate = (input) => {
  var parts = String.prototype.split.call(input || 'sample data', '-');
  return parts.length === 3 ? new Date(parts[0], parts[1]-1, parts[2]) : parts[0];
}

const cloneWithDateObjects = (x) => {
  var out = {};
  for (var key in x) out[key] = ~DATE_TYPE_FIELDS.indexOf(key) ? parseDate(x[key]) : x[key];
  return out;
};

const createCorrectResultsObject = (x) => {
  var out = {};
  OUTPUT_TYPE_FIELDS.forEach((key) => (x[key] || x[key] === false) && (out[key] = x[key]));
  return out;
};

const formatedOffenderRawData = (x) =>
  Object.assign(cloneWithDateObjects(x), { correct_results: createCorrectResultsObject(x) });

const logResults = (x) =>
  console.log({
    OGRS3: x.OGRS3,
    OGRS4s: x.OGRS4s,
    probabilityOfNonSexualViolence: x.probabilityOfNonSexualViolence,
    indecentImageProbability: x.indecentImageProbability,
    contactSexualProbability: x.contactSexualProbability,
    riskOfSeriousRecidivism: x.riskOfSeriousRecidivism,
    calculatorVersion: x.calculatorVersion,
  })

const runTestWithData = (calc) => (x) => () => {
  var result = calc(x);
  //logResults(result);
  result.riskOfSeriousRecidivism[1].should.be.withinExpectedTolerance(x, EXPECTEED_TOLERANCE);
};

const addTest = (calc) => (i, x) => {
  var fn = (x['execution'] == true ? it : it.skip);
  fn("should pass test number " + i + "  <" + x['pncId'] + ">", runTestWithData(calc)(formatedOffenderRawData(x)));
}

const addListOfTests = (calc) => (a) =>
  a.forEach((x, i) => addTest(calc)(i, x));

const addFilteredListOfTests = (calc) => (a, ids) =>
  ids.forEach((id) => addTest(calc)(id, a[id]));

module.exports = {
  runTestWithData: runTestWithData,
  addListOfTests: addListOfTests,
  addFilteredListOfTests: addFilteredListOfTests,
};
