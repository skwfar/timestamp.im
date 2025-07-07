import { useState, useCallback } from 'react';

export interface CopyHookReturn {
  copied: boolean;
  copyText: (text: string) => void;
}

export const useCopy = (resetDelay: number = 1000): CopyHookReturn => {
  const [copied, setCopied] = useState(false);

  const copyText = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, resetDelay);
  }, [resetDelay]);

  return {
    copied,
    copyText
  };
};