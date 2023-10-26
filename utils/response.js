exports.sendSuccessResponse = (
    res,
    message = "Success",
    status = 200,
    flag = true
  ) => {
    const response = { ...(typeof message === "object" ? message : { message }) };
    return res
      .status(status)
      .json({ ...(flag ? { success: true } : {}), ...response });
  };
  
  exports.sendErrorResponse = (
    res,
    message = "Internal Server Error",
    status = 500,
    flag = true
  ) => {
    const response = { ...(typeof message === "object" ? message : { message }) };
    return res
      .status(status)
      .json({ ...(flag ? { success: false } : {}), ...response });
  };