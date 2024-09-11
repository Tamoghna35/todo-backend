import logger from "../utils/logger.js";
const loggerInfo = (req, res, next) => { 
    res.on("finish", () => {
        if (res.statusCode >= 400 && res.statusCode <= 500) {
            logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`);
        } else if (res.statusCode >= 500) { 
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`);
        }
        else {
            logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}`);
        }
    })
   
    next();
};
export default loggerInfo;