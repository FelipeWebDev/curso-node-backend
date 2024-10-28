const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const { encrypt } = require("../../utils/crypt");

class AuthController {
  async authenticate(req, res) {
    const { user_name, email, password } = req.body;

    const whereClause = {};
    if (email) {
      whereClause.email = email;
    } else if (user_name) {
      whereClause.user_name = user_name;
    } else {
      return res.status(401).json({ error: "We need an e-mail or a password" });
    }

    const user = await Users.findOne({
      where: whereClause,
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!password) {
      return res.status(401).json({ error: "Insert your password" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, user_name: userName } = user;

    const {iv, content} = encrypt(id);
    const newId = `${iv}:${content}`;
    
    const token = jwt.sign({userId: newId}, process.env.HASH_BCRYPT, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return res.status(200).json({
      user: {
        id,
        user_name: userName,
      },
      token,
    });
  }
}

module.exports = new AuthController();
