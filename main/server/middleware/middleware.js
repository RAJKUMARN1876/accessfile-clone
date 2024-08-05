exports.isAlreadyLogin = (req, res, next) => {
  if (req.session && req.session.jpr) {
    return res.redirect("/uploads/");
  } else {
    return res.redirect("/");
  }
};
exports.isLogin = (req, res, next) => {
  if (req.session && req.session.jpr) {
    return res.redirect("/uploads/");
  } else {
    return next();
  }
};
