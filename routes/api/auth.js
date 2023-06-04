const express = require("express");

const controller = require("../../controller/auth");
const { validation, authenticate, upload } = require("../../middlewares");
const schemas = require("../../schemas/schemaUser");

const router = express.Router();

router.post(
  "/users/register",
  validation(schemas.register),
  controller.register
);

router.post("/users/login", validation(schemas.login), controller.login);

router.post("/users/logout", authenticate, controller.logout);

router.get("/users/current", authenticate, controller.current);

router.patch(
  "/users",
  authenticate,
  validation(schemas.subscription),
  controller.subscription
);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  controller.changeAvatar
);

module.exports = router;
