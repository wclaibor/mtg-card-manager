import fs from 'fs'
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
  return parse(rawCards, { header: true }).data.map(data => data['Card Name'])
}
