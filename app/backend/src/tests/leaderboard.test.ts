import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';
import mockedMatches from './mocks/mockedMatches';
import Team from '../database/models/Team';
import mockedTeams from './mocks/mockedTeams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing the leaderboard route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(mockedMatches as any);
    sinon
      .stub(Team, "findAll")
      .resolves(mockedTeams as any);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('should test the getTeamsRank - /leaderboard/home - [GET]', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
        .send()

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('should test the getTeamsRank - /leaderboard/away - [GET]', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send()

    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('should test the getTeamsRank - /leaderboard - [GET]', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')
        .send()

    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});
