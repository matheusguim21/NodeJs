import http from 'node:http'
import { json } from '../streams/middlewares/json.js'
import { routes } from '../streams/middlewares/routes.js'



const server = http.createServer(async(req, res) => {
  const { method, url } = req

  await json(req, res)
  
  const route = routes.find( route =>{
    return route.method === method && route.path === url
  })

  console.log(route)

  if(route){
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)