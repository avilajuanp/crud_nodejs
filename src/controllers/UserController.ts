import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  //instanciamos userService global para todos los métodos
  private userService;
  constructor() {
    this.userService = new UserService();
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleGetUserData = this.handleGetUserData.bind(this);
    this.handleListUsers = this.handleListUsers.bind(this);
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  async handleCreateUser(request: Request, response: Response) {
    const { username, email, telefono, ciudad, provincia } = request.body;

    try {
      await this.userService.createUser({
        username,
        email,
        telefono,
        ciudad,
        provincia
      }).then(() => {
        response.render("mensaje", {
          mensaje: "Usuario creado con éxito"
        });
      });
    } catch (err) {
      response.render("mensaje", {
        mensaje: `Error al crear usuario: ${err.mensaje}`
      });
    }
  }

  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.userService.deleteUser(id).then(() => {
        response.render("mensaje", {
          mensaje: "Usuario borrado con éxito"
        });
      });
    } catch (err) {
      response.render("mensaje", {
        mensaje: `Error al borrar usuario: ${err.mensaje}`
      });
    }
  }

  async handleGetUserData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const userService = new UserService();

    const user = await userService.getUserData(id);

    return response.render("edit", {
      user: user
    });
  }

  async handleListUsers(request: Request, response: Response) {

    const users = await this.userService.listUsers();

    return response.render("index", {
      users: users
    });
  }

  async handleSearchUser(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const userService = new UserService();

    try {
      const users = await userService.searchUser(search);
      response.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("mensaje", {
        mensaje: `Error al buscar usuario: ${err.mensaje}`
      });
    }
  }

  async handleUpdateUser(request: Request, response: Response) {
    const { id, username, email, telefono, ciudad, provincia } = request.body;

    const userService = new UserService();

    try {
      await userService.updateUser({ id, username, email, telefono, ciudad, provincia }).then(() => {
        response.render("mensaje", {
          mensaje: "Usuario actualizado con éxito"
        });
      });
    } catch (err) {
      response.render("mensaje", {
        mensaje: `Error al actualiar usuario: ${err.mensaje}`
      });
    }
  }
}

export default UserController;