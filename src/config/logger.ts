import { prismaClient } from "../api/v1/lib/db"

export const logger = async (method: string, url: string, origin: string, message: string) => {
    try {
        await prismaClient.log.create({
            data: {
                requestMethod: method,
                requestUrl: url,
                requestOrigin: origin,
                errorMessage: message
            }
        })
    } catch (error) {
        console.log("🚀 ~ file: logger.ts ~ logger ~ error:", error)

    }
} 