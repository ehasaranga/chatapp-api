import { app, init, DI } from '@app';
import request from 'supertest'


describe("GET /", () => {

    beforeAll(async () => {

        await init;

        // console.log('DI ', DI)
        // console.log('app ', app)

        await DI.orm.config.getDriver().reconnect();
        // await DI.orm.getSchemaGenerator().clearDatabase();

    })

    afterAll(async () => {

        await DI.orm.close(true);
        DI.server.close();

    });

    it("test api working", () => {

        request(app).get('/').expect(200)

    })

})