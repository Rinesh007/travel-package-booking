exports.success = (res, message, data = null) => {
  res.status(200).json({
    success: true,
    message,
    data
  });
};

exports.error = (res, message, status = 500) => {
  res.status(status).json({
    success: false,
    message
  });
};
