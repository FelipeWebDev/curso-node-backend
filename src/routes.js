const { Router } = require("express");

const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthMiddleware = require("./apps/middlewares/authentication");

const userSchema = require("./schema/create.user.schema.json");
const UserController = require("./apps/controllers/UserController");

const authSchema = require('./schema/auth.schema.json');
const AuthController = require("./apps/controllers/AuthController");

const routes = new Router();

routes.post("/user", schemaValidator(userSchema), UserController.create);
routes.post("/auth", schemaValidator(authSchema), AuthController.authenticate);

routes.use(AuthMiddleware);

routes.put("/user", UserController.update);
routes.delete("/user", UserController.delete);
routes.get("/user-profile", UserController.userProfile);

routes.get("/health", (req, res) => {
  return res.send({
    message: "Connected with success",
  });
});

module.exports = routes;
