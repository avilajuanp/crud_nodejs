import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";

class ProductController {
  //instanciamos ProductService global para todos los métodos
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleGetProductData = this.handleGetProductData.bind(this);
    this.handleListProducts = this.handleListProducts.bind(this);
    this.handleSearchProduct = this.handleSearchProduct.bind(this);
    this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
  }

  async handleCreateProduct(request: Request, response: Response) {
    const { nombre, categoria, precio } = request.body;

    try {
      await this.productService.createProduct({
        nombre,
        categoria,
        precio
      }).then(() => {
        request.flash("success", "Producto creado con éxito")
        response.redirect("/products")
      });
    } catch (err) {
      request.flash("error", "Error al crear producto: ${err.message}");
      response.redirect("/products");
    }
    //   }).then(() => {
    //     response.render("message", {
    //       message: "Producto creado con éxito"
    //     });
    //   });
    // } catch (err) {
    //   response.render("message", {
    //     message: `Error al crear producto: ${err.message}`
    //   });
    // }
  }

  async handleDeleteProduct(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.productService.deleteProduct(id).then(() => {
        request.flash("success", "Producto borrado con éxito")
        response.redirect("/products")
      });
    } catch (err) {
      request.flash("error", `Error al borrar producto: ${err.message}`);
      response.redirect("/products");
    }
    // try {
    //   await this.productService.deleteProduct(id).then(() => {
    //     response.render("message", {
    //       message: "Producto borrado con éxito"
    //     });
    //   });
    // } catch (err) {
    //   response.render("message", {
    //     message: `Error al borrar producto: ${err.message}`
    //   });
    // }
  }

  async handleGetProductData(request: Request, response: Response) {

    let { id } = request.query;
    id = id.toString();
    const categoryService = new CategoryService();

    const product = await this.productService.getProductData(id);
    const categories = await categoryService.listCategories();

    return response.render("products/edit", {
      product: product,
      categories: categories
    });
  }

  async handleListProducts(request: Request, response: Response) {

    const products = await this.productService.listProducts();

    return response.render("products/list", {
      products: products
    });
  }

  async handleSearchProduct(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    try {
      const products = await this.productService.searchProduct(search);
      response.render("products/search", {
        products: products,
        search: search
      });
    } catch (err) {
      request.flash("error", `Error al buscar producto: ${err.message}`);
      response.redirect("/products");
    }
  }

  async handleUpdateProduct(request: Request, response: Response) {
    const { id, nombre, categoria, precio } = request.body;

    try {
      await this.productService.updateProduct({ id, nombre, categoria, precio }).then(() => {
        request.flash("success", "Producto modificado con éxito");
        response.redirect("/products");
      });
    } catch (err) {
      request.flash("error", `Error al actualizar producto: ${err.message}`);
      response.redirect("/products");
    }
  }
}

export default ProductController;