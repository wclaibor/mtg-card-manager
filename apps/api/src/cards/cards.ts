import { Router } from 'express'
import { CardsRequest, CardsResponse } from 'libs/card-lib'
import { parseCsv } from './parse-csv'
import { getCardDetails } from './scryfall-api'

const CardsApi = Router()

CardsApi.post<never, CardsResponse, CardsRequest>(
  '/api/cards',
  async (req, res) => {
    const { start, end } = req.body

    console.log({ start, end })

    const cardNames = parseCsv().slice(start, end)

    const cards = await getCardDetails(cardNames).waitForAll()

    return res.send({ cards })
  },
)

export default CardsApi
