import { parse } from 'papaparse'
import { from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ScryfallService } from './scryfall.service'

function getCardName(card: any) {
  return card['Card Name']
}

export class CardService {
  private static decoder = new TextDecoder('utf-8')

  static testApi() {
    // return ajax.get('/api').pipe(map(response => response.response))
    fetch('/api').then(response => console.log(response))
  }

  static getCards(startRow?: number, endRow?: number) {
    return from(
      fetch('all_my_cards.csv').then(response => {
        const reader = response.body?.getReader()
        if (reader == null) {
          return ''
        }

        return reader.read().then(function (result) {
          return CardService.decoder.decode(result.value)
        })
      }),
    ).pipe(
      switchMap((rawCards: string) => {
        const parsed = parse(rawCards, { header: true }).data
        const names = parsed.map(card => getCardName(card))

        return ScryfallService.getCardsByName(names)
      }),
    )
  }
}
