import { Router } from 'express'
import { CardsRequest, CardsResponse } from 'libs/card-lib'
import { parseCsv } from './parse-csv'

const CardsApi = Router()

CardsApi.post<never, CardsResponse, CardsRequest>(
  '/api/cards',
  async (req, res) => {
    const { start, end } = req.body

    console.log({ start, end })

    const cardNames = parseCsv()

    return res.send({ cards: cardNames })
  },
)

export default CardsApi
