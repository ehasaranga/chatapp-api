import http from 'http'
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { joinUrl } from '@core/util';

import { MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityManager, MongoDriver, defineConfig } from '@mikro-orm/mongodb';

import { User } from '@app/models/User/User';
import { Message } from '@app/models/Message/Message';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const modules = {
    User,
    Message
}

export type TDI = {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    modules: typeof modules
}

export const DI = {} as TDI

const App = async function () {

    // Load Entities 
    const entities = Object.values(modules).map(item => item.entity);

    // DI Setup
    DI.orm = await MikroORM.init<MongoDriver>(defineConfig({
        entities: entities,
        dbName: 'chatapp',
        debug: true,
    }));

    DI.em = DI.orm.em as EntityManager;

    DI.modules = modules

    // DI Setup - END

    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(express.urlencoded({ extended: false, limit: '100mb' }))
    app.use(express.json())

    app.use((req, res, next) => {
        RequestContext.create(DI.em, next);
    });

    app.get('/', (req: Request, res: Response) => {

        res.send('Hi, This is the API')

    })


    // Setup Routes

    for (const module of Object.values(modules)) {

        if (!Array.isArray(module.endpoints)) continue;

        for (const endpoint of module.endpoints) {

            const path = joinUrl(module.name, endpoint.path);

            app[endpoint.method](path, endpoint.handler)

        }

    }

    DI.server = app.listen(PORT, async () => {

        console.log(`Server Port: http://localhost:${PORT}`);

    })

    return DI;

}()


