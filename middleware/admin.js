module.exports = (req, res, next) => {
  if (req.user.role !== "admin")
    return res
      .status(403)
      .json({
        status: 403,
        message: "Access denied. Admin privileges required.",
      }); // Forbidden

  next();
};
