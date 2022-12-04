import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';
import mockedMatches, { createdMatch, matchForCreation, mockedMatchesInProgress } from './mocks/mockedMatches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing the match route', () => {
  let chaiHttpResponse: Response;

  describe('endpoint /matches [GET]', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(mockedMatches as any);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('should test the getAllMatches - endpoint /matches [GET]', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matches')
  
      expect(chaiHttpResponse.status).to.be.equal(200)   
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatches)
    });
  })

  describe('endpoint /matches?inProgress=true [GET]', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(mockedMatchesInProgress as any);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('should test the getAllMatches - endpoint /matches?inProgress=true [GET]', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matches?inProgress=true')
  
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedMatchesInProgress)
    });
  })

  describe('endpoint /matches/:id/finish [PATCH]', () => {
    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves([1] as [number]);
    });
  
    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('should test the finishMatch - /matches/:id/finish [PATCH]', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .patch('/matches/41/finish')
  
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Finished" })
    });
  })

});
