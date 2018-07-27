const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
const requireCountriesService = require('../services/countries');
const countriesService = new requireCountriesService.CountriesService();

chai.should();

chai.use(chaiHttp);

describe('Server', function () {

  it('should redirect on youtube trends', (done) => {
    chai.request(server)
      .get('/').redirects(0)
      .end(function (err, res) {
        res.should.have.status(302);
        res.should.redirectTo('/youtube');
        done();
      });
  });

  it('should open /youtube', (done) => {
    chai.request(server)
      .get('/youtube')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('should open video with id: jBY-SBpIy-M /youtube/jBY-SBpIy-M', (done) => {
    chai.request(server)
      .get('/youtube/jBY-SBpIy-M')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 404 /Nothing', (done) => {
    chai.request(server)
      .get('/Nothing')
      .end(function (err, res) {
        res.should.have.status(404);
        expect(err).to.be.null;
        expect(res).to.be.html;
        done();
      });
  });

  it('should return true depend on ENV', (done) => {
    server.set('env', 'prod');
    chai.request(server)
      .get('/Nothing')
      .end(function (err, res) {
        res.should.have.status(404);
        expect(err).to.be.null;
        expect(res).to.be.html;
        done();
      });
  });
});


describe('Services', function () {
  it('should return array of country list', (done) => {
    expect(countriesService.getCountryList()).to.be.an('array');
    done();
  });

  it('should return object of country', (done) => {
    expect(countriesService.getCountryOrDefault()).to.be.an('object');
    done();
  });

  it('should return object of first country (Afghanistan)', (done) => {
    expect(countriesService.getCountryOrDefault('Any Thing')).to.include({
      "name": "Afghanistan",
      "code": "AF"
    });
    done();
  });

  it('should return object of Egypt', (done) => {
    expect(countriesService.getCountryOrDefault('EG')).to.include({
      "name": "Egypt",
      "code": "EG"
    });
    done();
  });
});