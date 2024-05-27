import { app, init, DI } from '@app';
import supertest from 'supertest'


describe("GET /", () => {

    beforeAll(async () => {

        await init;

        await DI.orm.config.getDriver().reconnect();

    })

    afterAll(async () => {

        await DI.orm.close(true);
        DI.server.close();

    });

    it("test api working", () => {

        return supertest(app)
            .get('/')
            .expect(200)

    })

})