import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const TypingInput = forwardRef(({ userInput, onInput, disabled }, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) inputRef.current.focus();
    }
  }));

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, userInput]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={userInput}
      onChange={(e) => onInput(e.target.value)}
      disabled={disabled}
      className="absolute opacity-0 h-0 w-0 pointer-events-none"
    />
  );
});

export default TypingInput;
