import express, { Application } from 'express';
import router from './routes';
import cors from "cors";
import compression from "compression";
import helmet from 'helmet';


export const app: Application = express();

function middlewareLaunch(): void{
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors())
    app.use(compression())
    app.use(helmet())
}

function routerLaunch(): void{
    app.use("/v1/", router)

    app.get("/", (req, res) => {
        res.send("hello main-stack test!!")
    })

    app.use((req, res) => {
        return res.status(404).json({
            message: "page not found"
        })
    });
}

export function build(): Application{
    middlewareLaunch()
    routerLaunch()

    return app
}

module.exports = {
    app,
    build,
}

