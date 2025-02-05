const sanitizeFields = (allowedFields, requiredFields = []) => {
    return (req, res, next) => {
      const receivedFields = Object.keys(req.body);
      const unwantedFields = receivedFields.filter((field) => !allowedFields.includes(field));
      const missingFields = requiredFields.filter((field) => !receivedFields.includes(field));
  
      if (unwantedFields.length > 0) {
        return res.status(400).json({
          status: 400,
          message: `Unwanted fields detected: ${unwantedFields.join(", ")}.`,
          allowedFields,
        });
      }
  
      if (missingFields.length > 0) {
        return res.status(400).json({
          status: 400,
          message: `Missing required fields: ${missingFields.join(", ")}.`,
          requiredFields,
        });
      }
  
      next();
    };
  };
  
  module.exports = sanitizeFields;
  