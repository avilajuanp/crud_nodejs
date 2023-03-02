import { getCustomRepository } from "typeorm";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface ICategory {
  id?: string;
  nombre: string;
  productos: Product[];
}

class CategoryService {

  async createCategory({ nombre, productos }: ICategory) {
    if (!nombre || !productos) {
      throw new Error("Por favor complete todos los campos");
    }
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const categoryAlreadyExists = await categoriesRepository.findOne({ nombre });

    if (categoryAlreadyExists) {
      throw new Error("Categoría ya existe");
    }

    const category = categoriesRepository.create({nombre, productos});

    await categoriesRepository.save(category);

    return category;

  }

  async deleteCategory(id: string) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const category = await categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :id", { id })
      .execute();

    return category;

  }

  async getCategoryData(id: string) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const category = await categoriesRepository.findOne(id);

    return category;
  }

  async listCategories() {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const categories = await categoriesRepository.find();

    return categories;
  }

  async searchCategory(search: string) {
    
    if (!search) {
      throw new Error("Por favor ingrese un término a buscar");
    }
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const category = await categoriesRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })
      .orWhere("productos like :search", { search: `%${search}%` })
      .getMany();

    return category;

  }

  async updateCategory({ id, nombre, productos }: ICategory) {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const category = await categoriesRepository
      .createQueryBuilder()
      .update(Category)
      .set({ nombre, productos })
      .where("id = :id", { id })
      .execute();

    return category;

  }
}

export default CategoryService;