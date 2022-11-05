import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
  //instanciamos ProductService global para todos los métodos
  private productService;
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
        response.render("message", {
          message: "Producto creado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al crear producto: ${err.message}`
      });
    }
  }

  async handleDeleteProduct(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.productService.deleteProduct(id).then(() => {
        response.render("message", {
          message: "Producto borrado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al borrar producto: ${err.message}`
      });
    }
  }

  async handleGetProductData(request: Request, response: Response) {
    
    let { id } = request.query;
    id = id.toString();

    const product = await this.productService.getProductData(id);

    return response.render("products/edit", {
      product: product
    });
  }

  async handleListProducts(request: Request, response: Response) {

    const products = await this.productService.listProducts();

    return response.render("index", {
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
      response.render("message", {
        message: `Error al buscar producto: ${err.message}`
      });
    }
  }

  async handleUpdateProduct(request: Request, response: Response) {
    const { id, nombre, categoria, precio } = request.body;

    try {
      await this.productService.updateProduct({ id, nombre, categoria, precio }).then(() => {
        response.render("message", {
          message: "Producto actualizado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar producto: ${err.message}`
      });
    }
  }
}

export default ProductController;