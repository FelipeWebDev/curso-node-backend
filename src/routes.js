const { Router } = require("express");

const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthMiddleware = require("./apps/middlewares/authentication");

const userSchema = require("./schema/create.user.schema.json");
const UserController = require("./apps/controllers/UserController");

const authSchema = require('./schema/auth.schema.json');
const AuthController = require("./apps/controllers/AuthController");

const router = new Router();

router.post("/user", schemaValidator(userSchema), UserController.create);
router.post("/auth", schemaValidator(authSchema), AuthController.authenticate);

router.use(AuthMiddleware);

router.put("/user", UserController.update);

router.delete("/user", UserController.delete);

router.get("/health", (req, res) => {
  return res.send({
    message: "Connected with success",
  });
});

module.exports = router;
