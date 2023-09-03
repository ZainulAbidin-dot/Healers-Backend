import express from 'express';
const { Constants } = require('./constants/index');
import { expressMiddleware } from "@apollo/server/express4"
import createApolloGraphqlServer from './graphql';

async function init() {

    const app = express();
    app.use(express.json())

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.listen(Constants.PORT, () => {
        console.log(`Healers Server is listening on port ${Constants.PORT}!`)
    })
}

init();