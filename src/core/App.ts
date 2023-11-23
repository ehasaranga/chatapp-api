import express, { Application, Request, Response } from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from "morgan";
import { TDefineModel } from "@core/defineModel";
import { joinUrl } from "@core/util";
import { MikroORM } from "@mikro-orm/core";


export const App = (props: IAppProps) => {

    const {
        modules,
        orm
    } = props;

    const app: Application = express();

    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))

    app.use(express.urlencoded({ extended: false, limit: '100mb' }))
    app.use(express.json())

    app.get('/', (req: Request, res: Response) => {

        res.send('Hi, This is the API')

    })

    for (const module of modules) {

        for ( const endpoint of module.endpoints ) {
            
            const path = joinUrl(module.name, endpoint.path);

            app[endpoint.method](path, endpoint.handler)

        }

    }

    return app;

}


export interface IAppProps {
    modules: TDefineModel<any>[];
    orm: MikroORM;
}