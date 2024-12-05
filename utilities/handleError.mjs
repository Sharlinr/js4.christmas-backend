export const handleError = (res, error, defaultMessage) => {
  console.error(defaultMessage, error.message);
  res.status(500).json({
    success: false,
    message: defaultMessage,
  });
};
