import React from 'react';

const PromptDisplay = ({ words, userInput }) => {
  // Flatten words array into a single string with spaces for easier comparison,
  // OR keep them as words and map through.
  // Requirement: "Cursor highlights current word/character".
  // Let's render word by word.

  const wordsString = words.join(' ');
  const chars = wordsString.split('');

  return (
    <div className='font-mono text-2xl leading-relaxed break-words text-gray-500 bg-gray-800 p-6 rounded-xl shadow-inner min-h-[200px]'>
      {chars.map((char, index) => {
        let colorClass = 'text-gray-500'; // Default (untyped)
        let bgClass = '';

        if (index < userInput.length) {
          if (userInput[index] === char) {
            colorClass = 'text-green-400';
          } else {
            colorClass = 'text-red-500';
            bgClass = 'bg-red-900/30';
          }
        }

        // Cursor logic: The character at userInput.length is the current one.
        const isCurrent = index === userInput.length;

        return (
          <span
            key={index}
            className={`${colorClass} ${bgClass} ${
              isCurrent ? 'border-l-2 border-yellow-400 animate-pulse' : ''
            }`}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default PromptDisplay;
