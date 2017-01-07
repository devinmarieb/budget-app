let moneyQuotes = [
  "Friends and good manners will carry you where money won't go. -Margaret Walker",
  "Money can buy you a fine dog, but only love can make him wag his tail. -Kinky Friedman",
  "Traveling – it leaves you speechless, then turns you into a storyteller. -Ibn Battuta",
  "The lack of money is the root of all evil. -Mark Twain",
  "Whoever said money can't buy happiness simply didn't know where to go shopping. -Bo Derek",
  "The gladdest moment in human life, me thinks, is a departure into unknown lands. -Sir Richard Burton",
  "It's better to waste money, than it is to waste time. You can always get more money. -Hal Sparks",
  "Rule No.1: Never lose money. Rule No.2: Never forget rule No.1. -Warren Buffett",
  "I am not the same, having seen the moon shine on the other side of the world. -Mary Anne Radmacher",
  "There is a gigantic difference between earning a great deal of money and being rich. -Marlene Dietrich",
  "Many folks think they aren’t good at earning money, when what they don’t know is how to use it. -Frank A. Clark",
   "To awaken alone in a strange town is one of the pleasantest sensations in the world. -Freya Stark",
  "Money is a terrible master but an excellent servant.” —P.T. Barnum",
  "A wise person should have money in their head, but not in their heart. -Jonathan Swift",
  "Man cannot discover new oceans unless he has the courage to lose sight of the shore. -Andre Gide",
  "The quickest way to double your money is to fold it in half and put it in your back pocket. -Will Rogers",
  "The world is a book, and those who do not travel read only one page. -Saint Augustine"
]

export const randomQuote = () => {
  var random = moneyQuotes[Math.floor(Math.random()*moneyQuotes.length)];
  return random
}
