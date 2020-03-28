const express = require("express")
const {celebrate, Segments, Joi} = require('celebrate')

const Ongcontroller = require('./Controllers/OngController')
const IncidentsController = require('./Controllers/IncidentController')
const ProfileController = require('./Controllers/ProfileController')
const SessionController = require('./Controllers/SessionController')

const routes = express.Router()

routes.post('/session',celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}),SessionController.create)

routes.get("/ongs", Ongcontroller.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),Ongcontroller.create)

routes.post("/incidents",celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),IncidentsController.create)
routes.get("/incidents",celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
    [Segments.BODY]:Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}),IncidentsController.index)
routes.delete("/incidents/:id",celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentsController.delete)

routes.get("/profile",celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),ProfileController.index)


module.exports = routes