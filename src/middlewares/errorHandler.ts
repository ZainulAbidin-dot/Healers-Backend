import { logger } from "../config/logger";
import { Constants, StatusCodes } from "../constants";
import { responseWrapper } from "../utils/responsewrapper";

const errorHandler = (err: any, req: any, res: any, next: any) => {
    const status = res.statusCode >= 500 ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR.code; // server errors

    if (status >= 500) {
        logger(req.method, req.url, req.headers.origin, err.message);
        if (Constants.APP_DEBUG || Constants.NODE_ENV === 'development') {
            console.log('\n\nAn error occured');
            console.log(`${req.method}, ${req.url},`);
            console.log(err.stack);
        }
    }

    responseWrapper(res, status, StatusCodes.INTERNAL_SERVER_ERROR.reasonPhrase, null, { error: err.message });
};

export default errorHandler;