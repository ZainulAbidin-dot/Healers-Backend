import { Constants } from "../constants"
import JWT from "jsonwebtoken";

export default function jwtToken(data: any): string {
    const token = JWT.sign({
        data
    }, Constants.JWT_SECRET, {
        expiresIn: 60 * 60
    })

    return token;
}