import UserService, { CreateUserPayload, GenerateUserTokenPayload } from "../../services/user.service";

const queries = {
    getUserToken: async (_: any, payload: GenerateUserTokenPayload) => {
        const res = await UserService.getUserToken(payload);
        return res;
    }
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
}

export const resolvers = {
    queries,
    mutations
}