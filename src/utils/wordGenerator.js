const WORDS = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "ugli",
  "vanilla",
  "watermelon",
  "xigua",
  "yam",
  "zucchini",
  "ant",
  "bear",
  "cat",
  "dog",
  "elephant",
  "fox",
  "giraffe",
  "hippo",
  "iguana",
  "jaguar",
  "kangaroo",
  "lion",
  "monkey",
  "newt",
  "owl",
  "penguin",
  "quail",
  "rabbit",
  "snake",
  "tiger",
  "urchin",
  "vulture",
  "wolf",
  "xerus",
  "yak",
  "zebra",
  "react",
  "javascript",
  "typescript",
  "html",
  "css",
  "node",
  "python",
  "java",
  "computer",
  "keyboard",
  "monitor",
  "mouse",
  "screen",
  "code",
  "developer",
  "engineer",
];

const SPECIAL_CHARS = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "{",
  "}",
  "[",
  "]",
  ";",
  ":",
  '"',
  "'",
  "<",
  ">",
  ",",
  ".",
  "?",
  "/",
  "\\",
  "|",
];

const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const generateWords = (count = 40) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];

    // to randomly add special characters or numbers
    if (Math.random() > 0.5) {
      const type = Math.random();
      if (type < 0.33) {
        word += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
      } else if (type < 0.66) {
        word += SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)];
      } else {
        word =
          SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)] +
          word;
      }
    }

    result.push(word);
  }
  return result;
};
