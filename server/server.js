const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
//this before routes to enable cors for all routes
app.use(cors())
