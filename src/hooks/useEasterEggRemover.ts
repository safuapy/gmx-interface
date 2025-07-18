import { useEffect } from 'react';

// Common patterns for developer easter eggs
const EASTER_EGG_PATTERNS = [
  // Current known pattern
  '2/tWLp',
  // Common patterns developers use
  /[0-9]+\/[a-zA-Z]{3,4}/, // Pattern like "2/tWLp", "1/abc", etc.
  /[a-zA-Z]{2,4}\/[0-9]+/, // Pattern like "abc/123", "dev/1", etc.
  /[a-zA-Z0-9]{3,6}\/[a-zA-Z0-9]{3,6}/, // General pattern like "abc/def"
  // Add more patterns as needed
];

export function useEasterEggRemover(targetSelector: string, customPatterns: string[] = []) {
  useEffect(() => {
    const removeEasterEgg = () => {
      const elements = document.querySelectorAll(targetSelector);
      elements.forEach(element => {
        if (!element.textContent) return;
        
        let modifiedText = element.textContent;
        let hasChanges = false;

        // Check custom patterns first
        customPatterns.forEach(pattern => {
          if (modifiedText.includes(pattern)) {
            modifiedText = modifiedText.replace(pattern, '');
            hasChanges = true;
          }
        });

        // Check built-in patterns
        EASTER_EGG_PATTERNS.forEach(pattern => {
          if (typeof pattern === 'string') {
            if (modifiedText.includes(pattern)) {
              modifiedText = modifiedText.replace(pattern, '');
              hasChanges = true;
            }
          } else {
            // Handle regex patterns
            const matches = modifiedText.match(pattern);
            if (matches) {
              matches.forEach(match => {
                modifiedText = modifiedText.replace(match, '');
                hasChanges = true;
              });
            }
          }
        });

        // Only update if we found and removed something
        if (hasChanges) {
          element.textContent = modifiedText.trim();
        }
      });
    };

    // Run immediately
    removeEasterEgg();
    
    // Set up a mutation observer to catch dynamic content
    const observer = new MutationObserver(removeEasterEgg);
    
    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [targetSelector, customPatterns]);
}

// Convenience hook for the current known easter egg
export function useRemoveCurrentEasterEgg() {
  return useEasterEggRemover('.Page-description', ['2/tWLp']);
}

// Hook for removing any suspicious text patterns
export function useRemoveSuspiciousText() {
  return useEasterEggRemover('.Page-description');
} 