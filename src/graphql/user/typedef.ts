const queries = `#graphql
    helloWorld: String
`;

const mutations = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): String
`;

export const typeDefs = {
    queries,
    mutations
}