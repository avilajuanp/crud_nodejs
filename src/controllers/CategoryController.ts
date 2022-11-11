import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";

class CategoryController {
  //instanciamos CategoryService global para todos los métodos
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleGetCategoryData = this.handleGetCategoryData.bind(this);
    this.handleListCategories = this.handleListCategories.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
    this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
  }

  async handleCreateCategory(request: Request, response: Response) {
    const { nombre, categoria, precio } = request.body;

    try {
      await this.categoryService.createCategory({
        nombre,
        categoria,
        precio
      }).then(() => {
        response.render("message", {
          message: "Categoría creada con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al crear categoría: ${err.message}`
      });
    }
  }

  async handleDeleteCategory(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.categoryService.deleteCategory(id).then(() => {
        response.render("message", {
          message: "Categoría borrada con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al borrar categoría: ${err.message}`
      });
    }
  }

  async handleGetCategoryData(request: Request, response: Response) {
    
    let { id } = request.query;
    id = id.toString();

    const category = await this.categoryService.getCategoryData(id);

    return response.render("categories/edit", {
      category: category
    });
  }

  async handleListCategories(request: Request, response: Response) {

    const categories = await this.categoryService.listCategories();

    return response.render("categories/list", {
      categories: categories
    });
  }

  async handleSearchCategory(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    try {
      const categories = await this.categoryService.searchCategory(search);
      response.render("categories/search", {
        categories: categories,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar categoría: ${err.message}`
      });
    }
  }

  async handleUpdateCategory(request: Request, response: Response) {
    const { id, nombre, categoria, precio } = request.body;

    try {
      await this.categoryService.updateCategory({ id, nombre, categoria, precio }).then(() => {
        response.render("message", {
          message: "Categoría actualizada con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar categoría: ${err.message}`
      });
    }
  }
}

export default CategoryController;