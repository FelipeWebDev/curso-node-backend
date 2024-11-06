const { Router } = require("express");
const { upload } = require("./configs/multer");

const schemaValidator = require("./apps/middlewares/schemaValidator");
const AuthMiddleware = require("./apps/middlewares/authentication");

const userSchema = require("./schema/create.user.schema.json");
const UserController = require("./apps/controllers/UserController");

const authSchema = require('./schema/auth.schema.json');
const AuthController = require("./apps/controllers/AuthController");

const postSchema = require('./schema/post.schema.json');
const PostController = require("./apps/controllers/PostController");

const FileController = require("./apps/controllers/FileController");

const routes = new Router();

routes.get("/health", (req, res) => {
  return res.send({
    message: "Connected with success",
  });
});

routes.post("/user", schemaValidator(userSchema), UserController.create);
routes.post("/auth", schemaValidator(authSchema), AuthController.authenticate);

routes.use(AuthMiddleware);

routes.put("/user", UserController.update);
routes.delete("/user", UserController.delete);
routes.get("/user-profile", UserController.userProfile);

routes.post("/upload", upload.single("Image"), FileController.upload);

routes.post("/new-post", schemaValidator(postSchema), PostController.create);
routes.delete("/delete-post/:id", PostController.delete);

module.exports = routes;
