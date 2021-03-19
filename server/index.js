require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const ctrl = require('./contorller')
const { port, connection_string } = process.env
app.use(express.json())

app.get('/api/items', ctrl.getItems)
app.post('/api/items', ctrl.addItem)

massive({
  connectionString: connection_string,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  app.listen(port, () => console.log(`We live in ${port}`))
}).catch(err => console.log(err))

// const port = 4000 