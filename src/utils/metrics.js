export const calculateWPM = (charsTyped, timeInSeconds) => {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  const wpm = charsTyped / 5 / minutes;
  return Math.round(wpm);
};

export const calculateWPH = (wpm) => {
  return Math.round(wpm * 60);
};

export const calculateWPS = (wpm) => {
  return parseFloat((wpm / 60).toFixed(2));
};

export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  const accuracy = (correctChars / totalChars) * 100;
  return Math.round(accuracy);
};


// Word-based stats (ADD these below your existing functions)
export const calculateWordStats = (typedWords, promptWords) => {
  let correctWords = 0;

  typedWords.forEach((word, index) => {
    if (word === promptWords[index]) correctWords++;
  });

  const totalWords = typedWords.length;
  const incorrectWords = totalWords - correctWords;

  return { correctWords, incorrectWords, totalWords };
};

export const calculateAccuracyWords = (correctWords, totalWords) => {
  if (totalWords === 0) return 100;
  return Math.round((correctWords / totalWords) * 100);
};
