import { prismaClient } from "../../../lib/db";
import jwtToken from "../../../utils/generateJWTToken";
import generateOTP from "../../../utils/generateOTP";
import UserService from "./user.service";

class AuthService {

    public static async sendEmail(email: string) {
        const userRecord = await UserService.getUserByEmail(email);
        if (!userRecord) {
            throw new Error("User not found");
        }

        const otpCode: string = generateOTP();

        await prismaClient.emailVerification.create({
            data: {
                email,
                otpCode
            }
        })

        // TODO: Send email Here
        return otpCode;
    }

    public static async verifyEmail(email: string, otpCode: string) {
        const emailRecord = await prismaClient.emailVerification.findUnique({
            where: {
                email
            }
        });

        if (!emailRecord) {
            throw new Error("Email not found");
        }
        if (emailRecord.otpCode !== otpCode) {
            throw new Error("Incorrect OTP Code");
        }

        await prismaClient.emailVerification.delete({
            where: {
                email
            }
        });

        return true;
    }

    public static async verifyForgotPassword(email: string, otpCode: string, password: string) {
        const result = await AuthService.verifyEmail(email, otpCode);

        if (!result) {
            throw new Error("Incorrect OTP Code");
        }
        const hashedPassword = UserService.generateHashedPassword("salt", password);
        const updatedUserRecord = await prismaClient.user.update({
            where: {
                email
            },
            data: {
                password: hashedPassword
            }
        });

        const token = jwtToken({
            id: updatedUserRecord.id,
            email: updatedUserRecord.email,
            role: updatedUserRecord.role,
        });

        return token;
    }
}
export default AuthService;