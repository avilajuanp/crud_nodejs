import { request, response, Router } from "express";
import CategoryController from "./controllers/CategoryController";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const productController = new ProductController();
const categoryController = new CategoryController();

router.get("/", (request, response) => {
  response.render("index");
});

router.get("/users", userController.handleListUsers);
router.get("/products", productController.handleListProducts);
router.get("/categories", categoryController.handleListCategories);

router.get("/users/add", (request, response) => {
  response.render("users/add");
});
router.get("/products/add", (request, response) => {
  response.render("products/add");
});
router.get("/categories/add", (request, response) => {
  response.render("categories/add");
});

router.post("/users/add-user", userController.handleCreateUser);
router.post("/products/add-product", productController.handleCreateProduct);
router.post("/categories/add-category", categoryController.handleCreateCategory);

router.get("/users/search", userController.handleSearchUser);
router.get("/products/search", productController.handleSearchProduct);
router.get("/categories/search", categoryController.handleSearchCategory);

router.get("/users/edit", userController.handleGetUserData);
router.get("/products/edit", productController.handleGetProductData);
router.get("/categories/edit", categoryController.handleGetCategoryData);

router.post("/users/edit-user", userController.handleUpdateUser);
router.post("/products/edit-products", productController.handleUpdateProduct);
router.post("/categories/edit-categories", categoryController.handleUpdateCategory);

router.post("/users/delete-user", userController.handleDeleteUser);
router.post("/products/delete-products", productController.handleDeleteProduct);
router.post("categories/delete", categoryController.handleDeleteCategory);

export { router };
