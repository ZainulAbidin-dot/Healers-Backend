import { StatusCodes } from "../../../constants";
import UserService, { CreateUserPayload, GenerateUserTokenPayload } from "../services/user"
import { responseWrapper } from "../utils/responsewrapper";

class UserController {
    public static signUp = async (req: { body: CreateUserPayload }, res: any) => {
        try {
            const result = await UserService.createUser(req.body);
            return responseWrapper(res, StatusCodes.OK.code, "User successfully created", result);
        } catch (error) {
            console.log("🚀 ~ file: user.controller.ts ~ UserController ~ signUp= ~ error:", error)
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "User has not been created");
        }
    }


    public static signIn = async (req: { body: GenerateUserTokenPayload }, res: any) => {
        try {
            const result = await UserService.getUserToken(req.body);
            return responseWrapper(res, StatusCodes.OK.code, "User successfully logged in", result);
        } catch (error) {
            console.log("🚀 ~ file: user.controller.ts ~ UserController ~ signIn= ~ error:", error)
            console.log("Error on UserController SignIn", error);
            return responseWrapper(res, StatusCodes.NOT_FOUND.code, "User has not been signed In");
        }
    }
}

export default UserController