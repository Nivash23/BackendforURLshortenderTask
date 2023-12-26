const LoginRouter = require("express").Router();
const User = require("../Model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

LoginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "user does not exists..",
    });
  }
  const isAuthenticate = await bcrypt.compare(password, user.passwordHash);
  if (!isAuthenticate) {
    return res.status(401).json({
      message: "Incorrect password...",
    });
  }
  const payload = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(payload, config.JWT);
  res.status(200).json({
    token,
    payload
  });
});
module.exports = LoginRouter;
