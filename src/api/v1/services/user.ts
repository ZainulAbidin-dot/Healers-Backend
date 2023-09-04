import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
import { Constants } from "../../../constants/index";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface GenerateUserTokenPayload {
    email: string;
    password: string;
}

class UserService {
    private static generateHashedPassword(salt: string, password: string) {
        const hashedPassword = createHmac("sha512", salt).update(password).digest("hex");
        return hashedPassword;
    }
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHashedPassword(salt, password);

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt,
            },
        })
    }

    public static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({
            where: {
                email,
            },
        });
    }

    public static async getUserToken(payload: GenerateUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password !== UserService.generateHashedPassword(user.salt, password)) {
            throw new Error("Incorrect Password");
        }
        const token = JWT.sign({
            email: user.email,
            id: user.id,
        },
            Constants.JWT_SECRET
        );
        return token;
    }
}

export default UserService;