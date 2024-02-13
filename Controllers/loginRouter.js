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
  if (!user.isActive)
  {
    return res.status(403).json({message:'Your has not been Active so you can not login'})
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
    username: user.username,
    name: user.name,
    id: user._id,
    user
  });
});
module.exports = LoginRouter;
