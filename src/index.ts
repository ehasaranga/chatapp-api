import http from 'http'
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { joinUrl } from '@core/util';

import { RequestContext } from '@mikro-orm/core';
import { EntityManager, MongoDriver, MikroORM, defineConfig } from '@mikro-orm/mongodb';

import { User } from '@app/models/User/User';
import { Message } from '@app/models/Message/Message';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { auth } from '@core/auth';


dotenv.config();

export const app: Application = express();
const PORT = process.env.PORT || 3000;

const models = {
    User: User,
    // Message: Message
}

export type TDI = {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    modules: typeof models
}

export const DI = {
    modules: models
} as TDI

export const init = (async () => {

    // Load Entities 
    const entities = Object.values(models).map(item => item.entity);

    // DI Setup
    DI.orm = await MikroORM.init<MongoDriver>(defineConfig({
        entities: Object.values(entities),
        metadataProvider: TsMorphMetadataProvider,
        metadataCache: { enabled: false },
        dbName: 'chatapp',
        debug: true,
    }));

    DI.em = DI.orm.em as EntityManager;

    // DI Setup - END

    app.disable('x-powered-by')
    app.use(cors())
    app.use(helmet())
    app.use(cookieParser(process.env.COOKIE_SECRET))
    app.use(morgan('dev'))
    app.use(express.urlencoded({ extended: false, limit: '10mb' }))
    app.use(express.json())

    app.use((req, res, next) => {
        RequestContext.create(DI.em, next);
    });

    app.get('/', (req: Request, res: Response) => {

        res.status(200).json('Hi, This is the API')

    })


    // Setup Routes

    for (const module of Object.values(models)) {

        if (!Array.isArray(module.endpoints)) continue;

        for (const endpoint of module.endpoints) {

            const moduleName = endpoint.baseRoute ? '' : module.name; 

            const path = joinUrl(moduleName, endpoint.path);

            app[endpoint.method](path, [auth(module.name, endpoint), endpoint.handler])

        }

    }

    DI.server = app.listen(PORT, async () => {

        console.log(`Server Port: http://localhost:${PORT}`);

    })

    DI.server.on('close', async () => {

        await DI.orm.close()

        console.log(`Server Shutdown`);

    })

    return DI;

})()




