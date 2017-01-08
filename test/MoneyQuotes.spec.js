import { assert, expect } from 'chai';
import { moneyQuotes, randomQuote } from '../lib/components/MoneyQuotes'

describe('randomQuote()', () => {

  it('returns a random quote', () => {
    let quote = randomQuote();
    expect(quote).to.be.not.empty;

  });




});
