import { CardIdentifier, Cards } from 'scryfall-sdk'

export function getCardDetails(cardNames: string[]) {
  const cardIdentifiers: CardIdentifier[] = cardNames.map(
    cardName => ({ name: cardName } as CardIdentifier),
  )
  return Cards.collection(...cardIdentifiers)
}
