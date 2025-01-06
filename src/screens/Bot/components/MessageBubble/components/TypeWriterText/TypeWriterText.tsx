import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypeWriterText = ({ text, speed = 50, onComplete}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <Text>
      {displayedText}
    </Text>
  );
};

export default TypeWriterText;