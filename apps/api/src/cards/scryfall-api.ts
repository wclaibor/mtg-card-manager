import { CardIdentifier, Cards } from 'scryfall-sdk'

export function getCardDetails(cardNames: string[]) {
  const cardIdentifiers: CardIdentifier[] = cardNames.map(
    cardName => ({ name: cardName } as CardIdentifier),
  )
  const emitter = Cards.collection(...cardIdentifiers)
  emitter.on('not_found', card => console.log(`${card.name} not found`, card))
  return emitter
}
