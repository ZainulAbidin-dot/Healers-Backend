import express from 'express';
const { Constants } = require('./constants/index');
import { expressMiddleware } from "@apollo/server/express4"
import createApolloGraphqlServer from './api/v1/graphql';
import errorHandler from './api/v1/middlewares/errorHandler';
import userRouter from './api/v1/routes/user.routes';

async function init() {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.use("/api/v1", userRouter);

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.all('*', (req, res) => {
        res.status(404);
        if (req.accepts('json')) {
            res.json({ message: '404 Not Found' });
        } else {
            res.type('txt').send('404 Not Found');
        }
    });

    app.use(errorHandler);

    app.listen(Constants.PORT, () => {
        console.log(`Healers Server is listening on port ${Constants.PORT}!`)
    });
}

init();