import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { request } from 'chai';
import app from '../index';
chai.use(chaiHttp);
import { delRedis } from '../app/utils/redis';

import 'mocha';

const expect = chai.expect;

var agent = request.agent(app)
let shortUrl;

describe('URL shortener test', () => {
    it('Should create a new Short URL', async () => {
        const res = await agent.post(`/v1/encode`).send({ url: 'https://ourpass.co/' });
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.haveOwnProperty('url');
        expect(res.body.data).to.haveOwnProperty('shortUrl');
        shortUrl = res.body.data.shortUrl;
    })

    it('Should decode a short URL', async () => {
        const res = await agent.get(`/v1/decode?url=${shortUrl}`);
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.haveOwnProperty('url');
        expect(res.body.data).to.haveOwnProperty('shortUrl');
    })
})