const express = require("express")

const Ongcontroller = require('./Controllers/OngController')
const IncidentsController = require('./Controllers/IncidentController')
const ProfileController = require('./Controllers/ProfileController')
const SessionController = require('./Controllers/SessionController')

const routes = express.Router()

routes.post('/session',SessionController.create)

routes.get("/ongs", Ongcontroller.index)
routes.post('/ongs',Ongcontroller.create)

routes.post("/incidents",IncidentsController.create)
routes.get("/incidents",IncidentsController.index)
routes.delete("/incidents/:id",IncidentsController.delete)

routes.get("/profile",ProfileController.index)


module.exports = routes