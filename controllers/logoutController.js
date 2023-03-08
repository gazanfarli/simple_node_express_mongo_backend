const User = require('../model/User');

const handleLogout = async (req, res) => {
  // On client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;
  // Is refresh token in DB?
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // Delete refresh token in DB
  foundUser.refreshToken = '';
  result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
