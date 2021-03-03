const router = require("express").Router();
const clientsRouter = require('./clientsRouter')

router.use('/clients', clientsRouter)
module.exports = router;