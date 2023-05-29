const express = require("express");

const controller = require("../../controller/auth");
const { validation, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

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

module.exports = router;
