import { Request, Response } from "express";

class ClientController {
  //instanciamos clientService global para todos los métodos
  private clientService: ClientService;
  
  constructor() {
    this.clientService = new ClientService();
    this.handleCreateClient = this.handleCreateClient.bind(this);
    this.handleDeleteClient = this.handleDeleteClient.bind(this);
    this.handleGetClientData = this.handleGetClientData.bind(this);
    this.handleListClients = this.handleListClients.bind(this);
    this.handleSearchClient = this.handleSearchClient.bind(this);
    this.handleUpdateClient = this.handleUpdateClient.bind(this);
  }

  async handleCreateClient(request: Request, response: Response) {
    const { nombre, email, telefono, dni, direccion } = request.body;

    try {
      await this.ClientService.createClient({
        nombre,
        email,
        telefono,
        dni,
        direccion
      }).then(() => {
        request.flash("sucess", "Cliente creado con éxito")
        response.redirect("/clients")
        // response.render("message", {
        //   message: "Cliente creado con éxito"
        // });
      });
    } catch (err) {
        request.flash("error", `Error al crear cliente: ${err.message}`);
        response.redirect("/clients")
    //   response.render("message", {
    //     message: `Error al crear cliente: ${err.message}`
    //   });
    }
  }

  async handleDeleteClient(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.clientService.deleteClient(id).then(() => {
        request.flash("sucess", "Cliente borrado con éxito")
        response.redirect("/clients")
        // response.render("message", {
        //   message: "Cliente borrado con éxito"
        // });
      });
    } catch (err) {
        request.flash("error", `Error al borrar cliente: ${err.message}`);
        response.redirect("/clients")
    //   response.render("message", {
    //     message: `Error al borrar cliente: ${err.message}`
    //   });
    }
  }

  async handleGetClientData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const client = await this.clientService.getclientData(id);

    return response.render("clients/edit", {
      client: client
    });
  }

  async handleListClients(request: Request, response: Response) {

    const clients = await this.clientService.listClients();

    return response.render("clients/list", {
      clients: clients
    });
  }

  async handleSearchClient(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    try {
      const clients = await this.clientService.searchClient(search);
      response.render("clients/search", {
        clients: clients,
        search: search
      });
    } catch (err) {
        request.flash("error", `Error al buscar cliente: ${err.message}`);
        response.redirect("/clients")
    //   response.render("message", {
    //     message: `Error al buscar cliente: ${err.message}`
    //   });
    }
  }

  async handleUpdateClient(request: Request, response: Response) {
    const { id, nombre, email, telefono, dni, direccion } = request.body;

    try {
      await this.clientService.updateClient({ id, nombre, email, telefono, dni, direccion }).then(() => {
        request.flash("sucess", "Cliente actualizado con éxito")
        response.redirect("/clients")
        // response.render("message", {
        //   message: "Cliente actualizado con éxito"
        // });
      });
    } catch (err) {
        request.flash("error", `Error al actualizar cliente: ${err.message}`);
        response.redirect("/clients")
    //   response.render("message", {
    //     message: `Error al actualizar cliente: ${err.message}`
    //   });
    }
  }
}

export default ClientController;