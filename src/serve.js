import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extracQueryParams } from "./utils/extract-query-params.js";


const main = http.createServer(async (req, res) => {

  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups

    req.params = params

    req.query = query ? extracQueryParams(query) : {}

    console.log(routeParams)
    req.params = { ...routeParams.groups }
    return route.handler(req, res);
  }
})

main.listen(8080);
