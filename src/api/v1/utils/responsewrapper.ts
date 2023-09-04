import { Constants } from '../../../constants/index';
export const responseWrapper = (response: any, status: number, message: string, data: object | string | null = null, devOnlyData: object | string | null = null) => {
    if (status === 204) {
        return response.sendStatus(status);
    }

    if (Constants.APP_DEBUG)
        return response.status(status).json({
            message,
            data,
            devOnlyData,
        });

    return response.status(status).json({
        message,
        data,
    });
};
