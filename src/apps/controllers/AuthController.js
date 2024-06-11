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

    const verifyUser = await Users.findOne({
      where: whereClause
    });

    if (!verifyUser) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json({ user: verifyUser });
  }
}

module.exports = new AuthController();
