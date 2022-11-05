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
        response.render("message", {
          message: "Usuario creado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al crear usuario: ${err.message}`
      });
    }
  }

  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.userService.deleteUser(id).then(() => {
        response.render("message", {
          message: "Usuario borrado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al borrar usuario: ${err.message}`
      });
    }
  }

  async handleGetUserData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const user = await this.userService.getUserData(id);

    return response.render("users/edit", {
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

    try {
      const users = await this.userService.searchUser(search);
      response.render("users/search", {
        users: users,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar usuario: ${err.message}`
      });
    }
  }

  async handleUpdateUser(request: Request, response: Response) {
    const { id, username, email, telefono, ciudad, provincia } = request.body;

    try {
      await this.userService.updateUser({ id, username, email, telefono, ciudad, provincia }).then(() => {
        response.render("message", {
          message: "Usuario actualizado con éxito"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }
  }
}

export default UserController;