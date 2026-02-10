export const getUserService = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Data fetch successfully",

    user,
  });
};
