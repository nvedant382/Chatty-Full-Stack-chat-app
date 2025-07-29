export const globalErrorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack || err.message);
    res.status(500).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
};