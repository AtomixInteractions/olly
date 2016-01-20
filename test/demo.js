
var olly = require('../lib/service');
var should = require('should');
should.config.checkProtoEql = true;

describe('Olly', function(){
  it('Demo', function(){
    should(olly).be.Function;
  });
});