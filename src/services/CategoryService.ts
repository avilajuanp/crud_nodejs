import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface ICategory {
  id?: string;
  nombre: string;
  productos: Product[];
}

class CategoryService {
  //instanciamos CategoryRepository global para todos los métodos
  private categoriesRepository: CategoriesRepository;
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.createCategory = this.createCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.getCategoryData = this.getCategoryData.bind(this)
    this.listCategories = this.listCategories.bind(this)
    this.searchCategory = this.searchCategory.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
  }

  async createCategory({ nombre, productos }: ICategory) {
    if (!nombre || !productos) {
      throw new Error("Por favor complete todos los campos");
    }

    const categoryAlreadyExists = await this.categoriesRepository.findOne({ nombre });

    if (categoryAlreadyExists) {
      throw new Error("Categoría ya existe");
    }

    const category = this.categoriesRepository.create({nombre, productos});

    await this.categoriesRepository.save(category);

    return category;

  }

  async deleteCategory(id: string) {
    const category = await this.categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :id", { id })
      .execute();

    return category;

  }

  async getCategoryData(id: string) {
    const category = await this.categoriesRepository.findOne(id);

    return category;
  }

  async listCategories() {
    const categories = await this.categoriesRepository.find();

    return categories;
  }

  async searchCategory(search: string) {
    if (!search) {
      throw new Error("Por favor ingrese un término a buscar");
    }

    const category = await this.categoriesRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })
      .orWhere("productos like :search", { search: `%${search}%` })
      .getMany();

    return category;

  }

  async updateCategory({ id, nombre, productos }: ICategory) {
    const category = await this.categoriesRepository
      .createQueryBuilder()
      .update(Category)
      .set({ nombre, productos })
      .where("id = :id", { id })
      .execute();

    return category;

  }
}

export default CategoryService;