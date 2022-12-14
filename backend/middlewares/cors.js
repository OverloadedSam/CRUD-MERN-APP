const ErrorResponse = require('../utils/errorResponse');

const validateOrigin = (req, res, next) => {
  const requestOrigin = req.get('origin');
  const ORIGIN = process.env.ORIGIN;

  if (ORIGIN === requestOrigin) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  } else {
    return next(new ErrorResponse(403, 'Access denied!'));
  }
};

module.exports = validateOrigin;
