import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';
import './VoiceAssistant.css';

interface Position {
  x: number;
  y: number;
}

// Declare Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const recognitionRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log('Voice command:', transcript);
      processCommand(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') {
        toast.error('Voice recognition error: ' + event.error);
      }
      setListening(false);
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [listening]);

  // ESC key to stop listening
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && listening) {
        stopListening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [listening]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setListening(true);
        toast.success('Voice assistant activated');
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      toast.info('Voice assistant deactivated');
    }
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const processCommand = (command: string) => {
    // Extract the target text from various command patterns
    const patterns = [
      /^click on (.+)$/,
      /^click (.+)$/,
      /^press (.+)$/,
      /^open (.+)$/,
      /^select (.+)$/,
      /^choose (.+)$/,
      /^tap (.+)$/,
      /^go to (.+)$/,
    ];

    let targetText = '';
    for (const pattern of patterns) {
      const match = command.match(pattern);
      if (match) {
        targetText = match[1].trim();
        break;
      }
    }

    if (!targetText) {
      toast.error('Command not recognized');
      return;
    }

    console.log('Looking for element:', targetText);
    findAndClickElement(targetText);
  };

  const findAndClickElement = (targetText: string) => {
    const allElements = document.querySelectorAll('*');
    const matches: { element: HTMLElement; score: number }[] = [];

    allElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      
      // Skip if not visible
      if (htmlElement.offsetWidth === 0 || htmlElement.offsetHeight === 0) {
        return;
      }

      // Skip if not interactive
      const tagName = htmlElement.tagName.toLowerCase();
      const isInteractive = 
        tagName === 'button' ||
        tagName === 'a' ||
        tagName === 'input' ||
        htmlElement.getAttribute('role') === 'button' ||
        htmlElement.onclick !== null ||
        htmlElement.classList.contains('clickable');

      if (!isInteractive) {
        return;
      }

      // Check various text sources
      const innerText = htmlElement.innerText?.toLowerCase() || '';
      const textContent = htmlElement.textContent?.toLowerCase() || '';
      const ariaLabel = htmlElement.getAttribute('aria-label')?.toLowerCase() || '';
      const title = htmlElement.getAttribute('title')?.toLowerCase() || '';

      const searchTarget = targetText.toLowerCase();
      
      // Calculate match score
      let score = 0;
      if (innerText.includes(searchTarget)) score += 10;
      if (textContent.includes(searchTarget)) score += 8;
      if (ariaLabel.includes(searchTarget)) score += 7;
      if (title.includes(searchTarget)) score += 5;
      
      // Exact match bonus
      if (innerText.trim() === searchTarget) score += 20;
      if (ariaLabel === searchTarget) score += 15;

      if (score > 0) {
        matches.push({ element: htmlElement, score });
      }
    });

    if (matches.length === 0) {
      toast.error(`Element not found: "${targetText}"`);
      return;
    }

    // Sort by score and pick the best match
    matches.sort((a, b) => b.score - a.score);
    const bestMatch = matches[0];

    console.log('Clicking element:', bestMatch.element);
    
    // Scroll into view and click
    bestMatch.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
      bestMatch.element.click();
      toast.success(`Clicked: "${targetText}"`);
    }, 300);
  };

  // Drag handlers
  const handleDragStart = (clientX: number, clientY: number) => {
    setDragging(true);
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handleDragging = (clientX: number, clientY: number) => {
    if (!dragging) return;

    const newX = Math.max(0, Math.min(clientX - dragOffset.x, window.innerWidth - 60));
    const newY = Math.max(0, Math.min(clientY - dragOffset.y, window.innerHeight - 60));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragging(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleDragging(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Global mouse/touch event listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, dragOffset]);

  const handleClick = (e: React.MouseEvent) => {
    // Only toggle listening if not dragging
    if (!dragging) {
      toggleListening();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`voice-assistant-container ${dragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: dragging ? 'none' : 'left 0.3s, top 0.3s',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      <div className={`voice-assistant-button ${listening ? 'listening' : ''}`}>
        {listening ? <Mic size={28} /> : <MicOff size={28} />}
      </div>
    </div>
  );
};

export default VoiceAssistant;
