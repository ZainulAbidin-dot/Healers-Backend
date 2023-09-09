import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../../../lib/db";
import { Role } from "@prisma/client";
import jwtToken from "../../../utils/generateJWTToken";

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role[];
}

export interface GenerateUserTokenPayload {
    email: string;
    password: string;
}

class UserService {
    public static generateHashedPassword(salt: string, password: string) {
        const hashedPassword = createHmac("sha512", salt).update(password).digest("hex");
        return hashedPassword;
    }
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password, role } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHashedPassword(salt, password);

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt,
                role,
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
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password !== UserService.generateHashedPassword(user.salt, password)) {
            throw new Error("Incorrect Password");
        }
        const token = jwtToken({
            email: user.email,
            role: user.role,
            id: user.id,
        });
        return token;
    }
}

export default UserService;