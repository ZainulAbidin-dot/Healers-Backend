import { StatusCodes } from "../../../constants";
import { responseWrapper } from "../../../utils/responsewrapper";
import UserService, { CreateUserPayload, GenerateUserTokenPayload } from "../services/user.sevice"

class UserController {
    public static signUp = async (req: any, res: any) => {
        try {
            const data: CreateUserPayload = req.body;
            const result = await UserService.createUser(data);
            return responseWrapper(res, StatusCodes.OK.code, "User successfully created", result);
        } catch (error) {
            console.log("🚀 ~ file: user.controller.ts ~ UserController ~ signUp= ~ error:", error)
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "User has not been created");
        }
    }


    public static signIn = async (req: any, res: any) => {
        try {
            const data: GenerateUserTokenPayload = req.body;
            const result = await UserService.getUserToken(data);
            return responseWrapper(res, StatusCodes.OK.code, "User successfully logged in", result);
        } catch (error) {
            console.log("🚀 ~ file: user.controller.ts ~ UserController ~ signIn= ~ error:", error)
            console.log("Error on UserController SignIn", error);
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "User has not been signed In");
        }
    }
}

export default UserController