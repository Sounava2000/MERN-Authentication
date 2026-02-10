class ErrorHandeler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandeler("Invalid token, try again!", 401);
  }
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandeler(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    err = new ErrorHandeler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "Token expired, please login again!";
    err = new ErrorHandeler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export default ErrorHandeler