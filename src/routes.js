const { Router } = require("express");
const schemaValidator = require("./apps/middlewares/schemaValidator");
const userSchema = require("./schema/create.user.schema.json");
const UserController = require("./apps/controllers/UserController");
const AuthController = require("./apps/controllers/AuthController");

const router = new Router();

router.post("/user", schemaValidator(userSchema), UserController.create);

router.post("/auth", AuthController.authenticate);

router.get("/", (req, res) => {
  return res.send({
    message: "Connected with success",
  });
});

module.exports = router;
