import { CardsRequest, CardsResponse } from 'libs/card-lib'
import { ajax } from 'rxjs/ajax'

function getCardName(card: any) {
  return card['Card Name']
}

export class CardService {
  private static decoder = new TextDecoder('utf-8')

  static testApi() {
    const request: CardsRequest = { start: 0, end: 0 }
    return ajax.post<CardsResponse>('/api/cards', request)
    // return fetch('/api/test').then(t => t.json())
  }

  static getCards(start?: number, end?: number) {
    return ajax.post<CardsResponse>('/api/cards', { start, end })
    // return from(
    //   fetch('all_my_cards.csv').then(response => {
    //     const reader = response.body?.getReader()
    //     if (reader == null) {
    //       return ''
    //     }

    //     return reader.read().then(function (result) {
    //       return CardService.decoder.decode(result.value)
    //     })
    //   }),
    // ).pipe(
    //   switchMap((rawCards: string) => {
    //     const parsed = parse(rawCards, { header: true }).data
    //     const names = parsed.map(card => getCardName(card))

    //     return ScryfallService.getCardsByName(names)
    //   }),
    // )
  }
}
