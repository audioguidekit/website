'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
  delayBeforeNextWord?: number;
}

export function Typewriter({
  words,
  typingSpeed = 190,
  deletingSpeed = 100,
  delayBeforeDelete = 2000,
  delayBeforeNextWord = 500,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState(words[0]);

  // Store all mutable state in refs to minimize effect dependencies
  const stateRef = useRef({
    currentWordIndex: 0,
    currentText: words[0],
    isDeleting: false,
  });

  // Store config in refs to avoid effect re-runs
  const configRef = useRef({ typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeNextWord });
  const wordsRef = useRef(words);

  // Update config ref when props change
  useEffect(() => {
    configRef.current = { typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeNextWord };
  }, [typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeNextWord]);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  // Main animation loop - only depends on words array identity for reset
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const state = stateRef.current;
      const config = configRef.current;
      const currentWords = wordsRef.current;
      const fullWord = currentWords[state.currentWordIndex];

      let nextDelay: number;

      if (!state.isDeleting) {
        if (state.currentText.length < fullWord.length) {
          // Typing
          state.currentText = fullWord.substring(0, state.currentText.length + 1);
          nextDelay = config.typingSpeed;
        } else {
          // Finished typing, wait then start deleting
          state.isDeleting = true;
          nextDelay = config.delayBeforeDelete;
        }
      } else {
        if (state.currentText.length > 0) {
          // Deleting
          state.currentText = fullWord.substring(0, state.currentText.length - 1);
          nextDelay = config.deletingSpeed;
        } else {
          // Finished deleting, move to next word
          state.isDeleting = false;
          state.currentWordIndex = (state.currentWordIndex + 1) % currentWords.length;
          nextDelay = config.delayBeforeNextWord;
        }
      }

      setDisplayText(state.currentText);
      timeoutId = setTimeout(tick, nextDelay);
    };

    // Start the animation loop
    timeoutId = setTimeout(tick, configRef.current.typingSpeed);

    return () => clearTimeout(timeoutId);
  }, []); // Empty deps - runs once on mount

  return <span>{displayText}</span>;
}
