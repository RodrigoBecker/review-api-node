import { Database } from "./database.js";
import { randomUUID } from "node:crypto"
import { builderRoutePath } from "./utils/buider-route-path.js";

const database = new Database()


export const routes = [

  {
    method: "GET",
    path: builderRoutePath("/users"),
    handler: (req, res) => {

      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null
      );
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: "POST",
    path: builderRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: "DELETE",
    path: builderRoutePath("/users/:id"),
    handler: (req, res) => {

      const { id } = req.params

      console.log(req.params.id)

      database.delete('users', id)

      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: builderRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body
      database.update('users', id, {
        name,
        email
      })
      return res.writeHead(204).end();

    }

  }

]
