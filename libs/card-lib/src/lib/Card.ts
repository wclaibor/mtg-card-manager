import { Card } from 'scryfall-sdk'

export interface CardsResponse {
  cards: Card[]
}

export interface CardsRequest {
  start: number
  end: number
}
