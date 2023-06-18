import { request, response, Router } from "express";
import CategoryController from "./controllers/CategoryController";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";
import { Category } from "./entities/Category";
import { CategoriesRepository } from "./repositories/CategoriesRepository";
import CategoryService from "./services/CategoryService";

const router = Router();

const userController = new UserController();
const productController = new ProductController();
const categoryController = new CategoryController();
const categoryService = new CategoryService();

router.get("/", (request, response) => {
  response.render("index");
});

router.get("/users", userController.handleListUsers);
router.get("/products", productController.handleListProducts);
router.get("/categories", categoryController.handleListCategories);

router.get("/users/add", (request, response) => {
  response.render("users/add");
});
router.get("/products/add", async (request, response) => {
  const categories: Category[] = await categoryService.listCategories();
  response.render("products/add", {categories});
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
router.post("/products/edit-product", productController.handleUpdateProduct);
router.post("/categories/edit-category", categoryController.handleUpdateCategory);

router.post("/users/delete-user", userController.handleDeleteUser);
router.post("/products/delete-products", productController.handleDeleteProduct);
router.post("/categories/delete-category", categoryController.handleDeleteCategory);

export { router };
