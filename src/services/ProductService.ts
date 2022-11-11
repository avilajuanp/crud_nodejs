import { getCustomRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProduct {
  id?: string;
  nombre: string;
  categoria: Category;
  precio: number;
}

class ProductService {
  //instanciamos ProductRepository global para todos los métodos
  private productsRepository: ProductsRepository;
  constructor() {
    this.productsRepository = new ProductsRepository();
    this.createProduct = this.createProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.getProductData = this.getProductData.bind(this)
    this.listProducts = this.listProducts.bind(this)
    this.searchProduct = this.searchProduct.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
  }

  async createProduct({ nombre,categoria,precio }: IProduct) {
    if (!nombre || !categoria || !precio) {
      throw new Error("Por favor complete todos los campos");
    }

    const productAlreadyExists = await this.productsRepository.findOne({ nombre });

    if (productAlreadyExists) {
      throw new Error("Producto ya existe");
    }

    const product = this.productsRepository.create({nombre, precio, categoria});

    await this.productsRepository.save(product);

    return product;

  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();

    return product;

  }

  async getProductData(id: string) {
    const product = await this.productsRepository.findOne(id);

    return product;
  }

  async listProducts() {
    const products = await this.productsRepository.find();

    return products;
  }

  async searchProduct(search: string) {
    if (!search) {
      throw new Error("Por favor ingrese un término a buscar");
    }

    const product = await this.productsRepository
      .createQueryBuilder()
      .where("product like :search", { search: `%${search}%` })
      .orWhere("categoria like :search", { search: `%${search}%` })
      .orWhere("precio like :search", { search: `%${search}%` })
      .getMany();

    return product;

  }

  async updateProduct({ id, nombre, categoria, precio }: IProduct) {
    const product = await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({ nombre, categoria, precio })
      .where("id = :id", { id })
      .execute();

    return product;

  }
}

export default ProductService;