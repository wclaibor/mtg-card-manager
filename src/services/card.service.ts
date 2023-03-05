import { parse } from 'papaparse'
import { ScryfallService } from './scryfall.service'
import { switchMap } from 'rxjs/operators'
import { from } from 'rxjs'

function getCardName(card: any) {
  return card['Card Name']
}

export class CardService {
  static getCards() {
    return from(
      fetch('all_my_cards.csv').then((response) => {
        let reader = response.body?.getReader()
        if (reader == null) {
          return ''
        }
        let decoder = new TextDecoder('utf-8')

        return reader.read().then(function (result) {
          return decoder.decode(result.value)
        })
      })
    ).pipe(
      switchMap((rawCards: string) => {
        const parsed = parse(rawCards, { header: true }).data
        const names = parsed.map((card) => getCardName(card))

        return ScryfallService.getCardsByName(names)
      })
    )
  }
}
