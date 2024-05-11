import http from 'http'
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import User from './models/User';
import { joinUrl } from '@core/util';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityManager, MongoDriver, defineConfig } from '@mikro-orm/mongodb';
import { modelObj } from '@core';
import Message from './models/Message';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const modules = [
    User, 
    Message
];

const moduleList = modelObj(modules);

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    modules: typeof moduleList
};

export const init = async function () {

    // Load Entities 
    const entities = modules.map(item => item.entity);

    // DI Setup
    DI.orm = await MikroORM.init<MongoDriver>(defineConfig({
        entities: entities,
        dbName: 'chatapp',
        debug: true,
    }));

    DI.em = DI.orm.em as EntityManager;

    DI.modules = moduleList

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

    for (const module of modules) {

        for (const endpoint of module['endpoints']) {

            const path = joinUrl(module.name, endpoint.path);

            app[endpoint.method](path, endpoint.handler)

        }

    }

    DI.server = app.listen(PORT, async () => {

        console.log(`Server Port: http://localhost:${PORT}`);

    })

}()


