const express = require("express")
const cors = require('cors')
const routes = require("./routes.js")

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

/**
 * 
 * Metodos HTTP:
 * 
 * Get: Buscar uma informação
 * Post: Criar uma informação
 * Put:Alterar uma infomação
 * Delete: Deletar uma informação
 * 
 * tipos de parâmetros:
 * 
 * Query Params:Parametros nomiados enviados na rota após "?" (Filtros, Paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utlizado para criar ou alterar recursos
 * 
 */

 /**
  * SQL: Mysql, Oracle, SQLite...
  * Nosql: MongoDB, CouchDB
  */

/**
 * Driver: select * From users
 * Query Builder: table('users').select("*").where() //use Knex.js
 */



app.listen(3333)