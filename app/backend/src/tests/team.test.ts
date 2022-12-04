import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import mockedTeams from './mocks/mockedTeams';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing the team route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(mockedTeams as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('should test the endpoint /teams', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedTeams)
  });

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(mockedTeams[1] as Team);
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('should test the endpoint /teams/:id', async () => {    
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/2')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(mockedTeams[1])
  });

});
