import express from 'express';
const { PORT } = require('./constants');
import { expressMiddleware } from "@apollo/server/express4"
import { prismaClient } from './lib/db';
import createApolloGraphqlServer from './graphql';

async function init() {

    const app = express();
    app.use(express.json())

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.listen(PORT, () => {
        console.log(`Healers Server is listening on port ${PORT}!`)
    })
}

init();