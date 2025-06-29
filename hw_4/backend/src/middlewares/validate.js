export const validate = schema => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map(error => ({
      field: error.path.join('.'),
      message: error.message,
      code: error.code
    }));
    
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Required fields are missing or invalid',
      details: errors
    });
  }
  req.body = result.data;
  next();
};