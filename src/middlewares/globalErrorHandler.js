
const globalErrorHandler = (err, req, res, next) => {
    console.log("error ===>", err);
    console.log("end of error");
    
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    const data = null;
    const success = false;
    return res.status(statusCode).json({
        success,
        data,
        message
    });
};
export default globalErrorHandler;
