import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  id?: string;
  username: string;
  password: string;
  email: string;
  telefono: string;
  ciudad: string;
  provincia: string;
}

class UserService {
  async createUser({ username, password, email, telefono, ciudad, provincia }: IUser) {
    if (!username || !password || !email || !telefono || !ciudad || !provincia) {
      throw new Error("Por favor complete todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("Username ya existe");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email ya está cargado");
    }

    const user = usersRepository.create({ username, password, email, telefono, ciudad, provincia });

    await usersRepository.save(user);

    return user;

  }

  async deleteUser(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;

  }

  async getUserData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }

  async listUsers() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async searchUser(search: string) {
    if (!search) {
      throw new Error("Por favor ingrese un término a buscar");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .orWhere("provincia like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }

  async updateUser({ id, username, password, email, telefono, ciudad, provincia }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username, password, email, telefono, ciudad, provincia })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export default UserService;