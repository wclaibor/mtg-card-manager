import fs from 'fs'
import { uniq } from 'lodash'
import { parse } from 'papaparse'
import path from 'path'

function getCardName(card: any) {
  return card['Card Name']
}

export function parseCsv(): string[] {
  const rawCards = fs.readFileSync(
    path.join(process.cwd(), 'assets/all_my_cards.csv'),
    'utf-8',
  )
  return uniq(
    parse(rawCards, { header: true })
      .data.map(data => data['Card Name'])
      .filter(cardName => cardName != null)
      .filter((cardName: string) => !cardName.includes('Token'))
      .map((cardName: string) => {
        if (cardName.includes(' // ')) {
          return cardName.slice(0, cardName.indexOf(' // '))
        }
        return cardName
      }),
  )
}
