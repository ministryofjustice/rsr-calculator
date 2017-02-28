const pkg = require('../package.json');
const should = require('chai').should();
const fixtureGenerators = require('./helpers/fixtureGenerators');

const calc = require('../lib/calculateContactSexualProbability');

describe('Offender Sexual Predictor Score', () => {
  describe('when required data is not present', () => {
    var data = {};

    it('should produce two scores of 0', () => {
      calc(data).should.eql([0, 0]);
    });
  });

  describe('when only data is sentenceDate', () => {
    var data = {
      sentenceDate: new Date(2017, 0, 1),
    };

    it('should produce two scores of 0', () => {
      calc(data).should.eql([0, 0]);
    });
  });

  describe('when only data is that there is no current or previous sexual element', () => {
    var data = {
      sexualOffenceHistory: 1,
      sexualElement: 1,
    };

    it('should produce two scores of 0', () => {
      calc(data).should.eql([0, 0]);
    });
  });

  describe('when data describes a woman', () => {
    var data = {
      sex: 1,
    };

    it('should produce two scores of 0', () => {
      calc(data).should.eql([0.0051813471502590676, 0.0051813471502590676]);
    });
  });

  describe('when data describes a male with one previous sexual offence', () => {
    var data = {
      sex: 0,
      sexualOffenceHistory: 1,
      birthDate: new Date(1974, 0, 1),
      mostRecentSexualOffence: new Date(1998, 0, 1),
      sentenceDate: new Date(2017, 0, 1),
    };

    it('should produce two scores of 0', () => {
      calc(data).should.eql([0.001133749854539701, 0.0020657476931578095]);
    });
  });

  describe('when data describes a 20yr old male sex offender', () => {
    var data = {
      sex: 0,
      sexualOffenceHistory: 1,
      sexualElement: 0,
      birthDate: new Date(1997, 0, 1),
      convictionDate: new Date(2017, 0, 1),
      mostRecentSexualOffence: new Date(2017, 0, 1),
      assessmentDate: new Date(2017, 0, 1),
      sentenceDate: new Date(2017, 0, 1),
    };

    it('should produce the correct two scores', () => {
      calc(data).should.eql([
        0.003132032644783992,
        0.005697347108184674]);
    });
  });

  describe('when data describes a 30yr old male sex offender', () => {
    var data = {
      sex: 0,
      sexualOffenceHistory: 1,
      sexualElement: 0,
      birthDate: new Date(1987, 0, 1),
      convictionDate: new Date(2017, 0, 1),
      mostRecentSexualOffence: new Date(2017, 0, 1),
      assessmentDate: new Date(2017, 0, 1),
      sentenceDate: new Date(2017, 0, 1),
    };

    it('should produce the correct two scores', () => {
      calc(data).should.eql([
        0.0018848635402728055,
        0.003432191950002231]);
    });
  });

  describe('when data describes a 60yr old male sex offender', () => {
    var data = {
      sex: 0,
      sexualOffenceHistory: 1,
      sexualElement: 0,
      birthDate: new Date(1957, 0, 1),
      convictionDate: new Date(2017, 0, 1),
      mostRecentSexualOffence: new Date(2017, 0, 1),
      assessmentDate: new Date(2017, 0, 1),
      sentenceDate: new Date(2017, 0, 1),
    };

    it('should produce the correct two scores', () => {
      calc(data).should.eql([
        0.0005286231953860867,
        0.000963657229304141]);
    });
  });
});