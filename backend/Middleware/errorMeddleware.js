const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  const stateCode = res.stateCode === 200 ? 500 : res.stateCode;
  res.status(stateCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export { notFound, errorHandler };