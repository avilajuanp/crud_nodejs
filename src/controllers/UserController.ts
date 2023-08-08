import { Request, Response } from "express";
import UserService from "../services/UserService";
import { Utils } from "../utils";

class UserController {
  //instanciamos userService global para todos los métodos
  private userService: UserService;
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
    const { username, password, email, telefono, ciudad, provincia } = request.body;

    try {
      await this.userService.createUser({
        username,
        password: await Utils.encryptPassword(password),
        email,
        telefono,
        ciudad,
        provincia,
      }).then(() => {
        request.flash("success", "Usuario creado con éxito");
        response.redirect("/users");
      });
    } catch (err) {
      request.flash("error", `Error al crear usuario: ${err.message}`
      );
    }
  }

  async handleDeleteUser(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.userService.deleteUser(id).then(() => {
        request.flash("success", "Usuario borrado con éxito");
        response.redirect("/users");
      });
    } catch (err) {
      request.flash("error", `Error al borrar usuario: ${err.message}`
      );
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

    return response.render("users/list", {
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
      request.flash("error", `Error al buscar usuario: ${err.message}`);
      response.redirect("/users");
    }
  }

  async handleUpdateUser(request: Request, response: Response) {
    const { id, username, password, email, telefono, ciudad, provincia } = request.body;

    try {
      await this.userService.updateUser({
        id,
        username,
        password: await Utils.encryptPassword(password),
        email,
        telefono,
        ciudad,
        provincia
      }).then(() => {
        request.flash("success", "Usuario actualizado con éxito");
        response.redirect("/users");
      });
    } catch (err) {
      request.flash("error", `Error al actualizar usuario: ${err.message}`);
      response.redirect("/users");
    }
  }
}

export default UserController;