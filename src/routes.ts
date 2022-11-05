import { Router } from "express";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const productController = new ProductController();

router.get("/users", userController.handleListUsers);
router.get("/products", productController.handleListProducts);

router.get("/users/add", (request, response) => {
  response.render("users/add");
});
router.get("/products/add", (request, response) => {
  response.render("products/add");
});

router.post("/users/add-user", userController.handleCreateUser);
router.post("/products/add-product", productController.handleCreateProduct);

router.get("/users/search", userController.handleSearchUser);
router.get("/products/search", productController.handleSearchProduct);

router.get("/users/edit", userController.handleGetUserData);
router.get("/products/edit", productController.handleGetProductData);

router.post("/users/edit-user", userController.handleUpdateUser);
router.post("/products/edit-products", productController.handleUpdateProduct);

router.post("/users/delete-user", userController.handleDeleteUser);
router.post("/products/delete-products", productController.handleDeleteProduct);

export { router };
