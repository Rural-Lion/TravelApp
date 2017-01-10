var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('getRecAreas', () => {
  it('Should return a full RecArea', () => {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 1})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  })
})
