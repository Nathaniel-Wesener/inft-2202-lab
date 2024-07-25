import { logger } from "../utils/logger.js";
import { ConflictError } from "../errors/ConflictError.js";

export const ErrorHandlingMiddleware = (error, request, response, next) => {
    const { message, stack, statusCode = 500 } = error;
    const { method, originalUrl, body, params, query, headers} = request;
    const time = new Date().toISOString();
    const context = {
        time,
        stack,
        request: {
            method,
            path: originalUrl,
            body,
            params,
            query,
            headers
        },
        response: {
            statusCode,
            body: response.locals.data
        }

    };
    const responseObject = {
        message
    }
    if(error instanceof ConflictError){
        responseObject.errors = error.details;
    }
    logger.error(`${statusCode}: ${message}`, context);
    response.status(statusCode).send(responseObject);
}