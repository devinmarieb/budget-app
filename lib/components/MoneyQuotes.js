let moneyQuotes = [
  "Friends and good manners will carry you where money won't go. -Margaret Walker",
  "Money can buy you a fine dog, but only love can make him wag his tail. -Kinky Friedman",
  "The lack of money is the root of all evil. -Mark Twain",
  "Whoever said money can't buy happiness simply didn't know where to go shopping. -Bo Derek",
  "It's better to waste money, than it is to waste time. You can always get more money. -Hal Sparks",
  "Rule No.1: Never lose money. Rule No.2: Never forget rule No.1. -Warren Buffett",
  "There is a gigantic difference between earning a great deal of money and being rich. -Marlene Dietrich",
  "Many folks think they aren’t good at earning money, when what they don’t know is how to use it. -Frank A. Clark",
  "Money is a terrible master but an excellent servant.” —P.T. Barnum",
  "A wise person should have money in their head, but not in their heart. -Jonathan Swift",
  "The quickest way to double your money is to fold it in half and put it in your back pocket. -Will Rogers",
]

const randomQuote = () => {
  var random = moneyQuotes[ Math.floor(Math.random()* moneyQuotes.length) ];
  return random
}

export { moneyQuotes, randomQuote };
