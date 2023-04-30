import { Router } from 'express'
import { CardsRequest, CardsResponse } from 'libs/card-lib'
import { parseCsv } from './parse-csv'
import { getCardDetails } from './scryfall-api'

const CardsApi = Router()

CardsApi.post<never, CardsResponse, CardsRequest>(
  '/api/cards',
  async (req, res) => {
    const { start, end } = req.body

    const cardNames = parseCsv()

    const cards = await getCardDetails(cardNames.slice(start, end)).waitForAll()

    console.log(`returning ${cards.length} cards`)

    return res.send({ cards })
  },
)

export default CardsApi
