const auth = (req, res, next) => {
  // Replace this with your actual authentication logic
  const isLoggedIn = req.session.isLoggedIn || false; // Example using session
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = auth;
