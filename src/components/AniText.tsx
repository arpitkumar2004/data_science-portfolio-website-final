// AniText.tsx
import React, { useState, useEffect } from "react";

interface AniTextProps {
  texts: string[];
  typingSpeed?: number; // milliseconds per character
  pauseTime?: number;   // milliseconds to wait before erasing
}

const AniText: React.FC<AniTextProps> = ({
  texts,
  typingSpeed = 100,
  pauseTime = 1500,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentText.length) {
      // Typing
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, typingSpeed / 2); // faster deleting
    } else if (!isDeleting && displayedText.length === currentText.length) {
      // Pause before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next text
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, texts, textIndex, typingSpeed, pauseTime]);

  return (
    <span>
      {displayedText}
      <span className="animate-blink">|</span>
      <style>{`
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default AniText;
