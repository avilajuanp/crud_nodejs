import { Router } from "express";
import UserController from "./controllers/UserController";

const router = Router();

const userController = new UserController();

router.get("/", userController.handleListUsers);

router.get("/add", (request, response) => {
  response.render("add");
});

router.post("/add-user", userController.handleCreateUser);

router.get("/search", userController.handleSearchUser);

router.get("/edit", userController.handleGetUserData);

router.post("/edit-user", userController.handleUpdateUser);

router.post("/delete-user", userController.handleDeleteUser);

//router.get("/products/list")

export { router };
