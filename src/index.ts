import express from 'express';
const { PORT } = require('./constants');
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"

async function init() {

    const app = express();

    app.use(express.json())
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String!
            }`,
        resolvers: {
            Query: {
                hello: () => "Hello World!",
                say: (_, {name}: {name: string}) => `Hey ${name}!`
            }
        }
    })

    await gqlServer.start();

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.use("/graphql", expressMiddleware(gqlServer));
    app.listen(PORT, () => {
        console.log(`Healers Server is listening on port ${PORT}!`)
    })
}

init();