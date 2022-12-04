import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import mockedUser from './mocks/mockedUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testing the login route', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockedUser as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('should test the controller when the loginData is correct', async () => {
    const loginData = {
      email: 'user@user.com',
      password: 'secret_user'
    }
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginData)

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('should test the controller when the loginData is without email', async () => {
    const loginData = {
      password: 'secret_user'
    }
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginData)

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

  it('should test the controller when the loginData is without password', async () => {
    const loginData = {
      password: 'secret_user'
    }
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginData)

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });

  it('should test the controller when the loginData have a invalid password', async () => {
    const loginData = {
      email: 'user@user.com',
      password: 'invalid_password'
    }
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginData)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });
});
