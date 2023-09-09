import { StatusCodes } from "../../../constants";
import { responseWrapper } from "../../../utils/responsewrapper";
import AuthService from "../services/auth.service";
import UserService, { GenerateUserTokenPayload } from "../services/user.service"

class AuthController {
    public static sendEmail = async (req: any, res: any) => {
        try {
            const { email } = req.body;
            const result = await AuthService.sendEmail(email);
            return responseWrapper(res, StatusCodes.OK.code, "Email successfully send", result);
        } catch (error) {
            console.log("🚀 ~ file: auth.controller.ts ~ AuthController ~ signUp= ~ error:", error)
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "Email has not been send");
        }
    }

    public static verifyEmail = async (req: any, res: any) => {
        try {
            const { email, otpCode } = req.body;
            const result = await AuthService.verifyEmail(email, otpCode);
            return responseWrapper(res, StatusCodes.OK.code, "Email successfully verified", { isVerified: result });
        } catch (error) {
            console.log("🚀 ~ file: auth.controller.ts ~ AuthController ~ signUp= ~ error:", error)
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "Email has not been verified");
        }
    }

    public static forgotPassword = async (req: any, res: any) => {
        try {
            const { email } = req.body;
            const result = await AuthService.sendEmail(email);
            return responseWrapper(res, StatusCodes.OK.code, "Forgot password code successfully sent", result);
        } catch (error) {
            console.log("🚀 ~ file: auth.controller.ts ~ AuthController ~ signUp= ~ error:", error)
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "Forgot password code has not been sent");
        }
    }

    public static verifyForgotPassword = async (req: any, res: any) => {
        try {
            const { email, otpCode, password } = req.body;
            const result = await AuthService.verifyEmail(email, otpCode);
            return responseWrapper(res, StatusCodes.OK.code, "Forgot password code successfully verified", { isVerified: result });
        } catch (error) {
            console.log("🚀 ~ file: auth.controller.ts ~ AuthController ~ signUp= ~ error:", error)
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "Forgot password code has not been verified");
        }
    }

    public static refreshToken = async (req: any, res: any) => {
        // TODO: Implement refresh token
    }

    public static signIn = async (req: any, res: any) => {
        try {
            const data: GenerateUserTokenPayload = req.body;
            const result = await UserService.getUserToken(data);
            return responseWrapper(res, StatusCodes.OK.code, "User successfully logged in", result);
        } catch (error) {
            console.log("🚀 ~ file: auth.controller.ts ~ AuthController ~ signIn= ~ error:", error)
            console.log("Error on AuthController SignIn", error);
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "User has not been signed In");
        }
    }
}

export default AuthController