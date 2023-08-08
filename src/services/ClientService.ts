import { getCustomRepository } from "typeorm";
import { ClientsRepository } from "../repositories/ClientsRepository";
import { Client } from "../entities/Client";

interface IClient {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  direccion: string;
  // productos: Product[];
}

class ClientService {

  async createclient({ nombre, email, telefono, dni, direccion }: IClient) {
    if (!nombre || !email || !telefono || !dni || !direccion) {
      throw new Error("Por favor complete todos los campos");
    }
    const clientsRepository = getCustomRepository(ClientsRepository);

    const clientAlreadyExists = await clientsRepository.findOne({ dni });

    if (clientAlreadyExists) {
      throw new Error("Ya existe un cliente con ese dni");
    }

    const client = clientsRepository.create({ nombre, email, telefono, dni, direccion });

    await clientsRepository.save(client);

    return client;

  }

  async deleteClient(id: string) {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const client = await clientsRepository
      .createQueryBuilder()
      .delete()
      .from(Client)
      .where("id = :id", { id })
      .execute();

    return client;

  }

  async getclientData(id: string) {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const client = await clientsRepository.findOne(id);

    return client;
  }

  async listClients() {
    const clientsRepository = getCustomRepository(ClientsRepository);
    const clients = await clientsRepository.find();

    return clients;
  }

  async searchClient(search: string) {

    if (!search) {
      throw new Error("Por favor ingrese un término a buscar");
    }
    const clientsRepository = getCustomRepository(ClientsRepository);
    const client = await clientsRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("dni like :search", { search: `%${search}%` })
      .orWhere("direccion like :search", { search: `%${search}%` })
      .getMany();

    return client;

  }

  async updateClient({ id, nombre, email, telefono, dni, direccion }: IClient) {
    const clientsRepository = getCustomRepository(ClientsRepository);

    const client = await clientsRepository
      .createQueryBuilder()
      .update(Client)
      .set({ nombre, email, telefono, dni, direccion })
      .where("id = :id", { id })
      .execute();

    return client;

  }
}

export default ClientService;