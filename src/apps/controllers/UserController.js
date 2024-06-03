const Users = require("../models/Users");

class UserController {
    async create(req, res) {
        console.log(req.body);
        res.send({ users: "teste" });
    }
}

module.exports = new UserController();