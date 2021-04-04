const express = require('express')
const router = require('./routes/router')
const app = express()
const port = 3000

app.use('/', router)

app.listen(port, () => {
    console.log(`API iniciada na porta ${port}!`)
})