import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Card } from 'scryfall-sdk';

export class ScryfallService {
  static getCardsByName(cardNames: string[]) {
    // Endpoint only allows 75 cards per request

    cardNames = cardNames.slice(0, 74);
    return ajax
      .post<{ data: Card[] }>('https://api.scryfall.com/cards/collection', {
        identifiers: cardNames.map((name) => ({ name })),
      })
      .pipe(map((response) => response.response.data));
  }
}
