const { Router } = require("express");
const UserController = require("./apps/controllers/UserController");

const router = new Router();

router.post("/user", UserController.create)

router.get("/", (req, res) => {
  return res.send({
    message: "Connected with success",
  });
});

module.exports = router;
