import { prismaClient } from "../../lib/db"

const queries = {
    helloWorld: () => "Hello World!"
}

const mutations = {
    createUser: async (_: any, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
        await prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
                salt: "salt"
            }
        });

        return "success"
    }
}

export const resolvers = {
    queries,
    mutations
}