
const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // 2. Set the determined status code on the response
    res.status(statusCode);

    // 3. Send the JSON response back to the client
    res.json({
        message: err.message,
        // Only include the stack trace in development for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;