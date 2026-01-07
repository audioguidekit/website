'use client';

import React, { useState, useEffect } from 'react';

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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (currentText.length < fullWord.length) {
          setCurrentText(fullWord.substring(0, currentText.length + 1));
        } else {
          timeout = setTimeout(() => setIsDeleting(true), delayBeforeDelete);
          return;
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullWord.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
      }

      timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    };

    // Only start the loop if we're not already waiting for a delay (like delayBeforeDelete)
    if (!timeout) {
      timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBeforeDelete, delayBeforeNextWord]);

  return <span>{currentText}</span>;
}
