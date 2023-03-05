import bodyParser from 'body-parser'
import express from 'express'
import CardsApi from './cards/cards'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(CardsApi)

app.get('/api/test', (req, res) => {
  res.send({ message: 'Hello API' })
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
