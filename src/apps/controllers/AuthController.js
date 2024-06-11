const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

class AuthController {
  async authenticate(req, res) {
    const { user_name, email, password } = req.body;

    let whereClause = {};
    if (email) {
        whereClause = {email}
    } else if (user_name) {
        whereClause = {user_name}
    } else {
        return res.status(401).json({ error: "We need an e-mail or a password" });
    }

    const user = await Users.findOne({
      where: whereClause
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!password) {
      return res.status(401).json({ error: "Insert your password" });
    }

    if (!await user.checkPassword(password)) {
      return res.status(401).json({ error: "Password does not match" });
    }

    return res.status(200).json({ user });
  }
}

module.exports = new AuthController();
