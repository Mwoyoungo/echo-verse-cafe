
import React, { useState, useRef } from 'react';
import { Play, Pause, Mic, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AudioRecorder from './AudioRecorder';

interface Annotation {
  id: string;
  startIndex: number;
  endIndex: number;
  text: string;
  audioUrl?: string;
  author: string;
  timestamp: string;
}

interface TextWithAnnotationsProps {
  content: string;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Omit<Annotation, 'id' | 'timestamp'>) => void;
}

const TextWithAnnotations: React.FC<TextWithAnnotationsProps> = ({ 
  content, 
  annotations, 
  onAddAnnotation 
}) => {
  const [selectedText, setSelectedText] = useState<{
    text: string;
    startIndex: number;
    endIndex: number;
  } | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    
    if (text) {
      // This is a simplification - in a real app we'd need to handle complex nested DOM better
      const startIndex = content.indexOf(text);
      const endIndex = startIndex + text.length;
      
      setSelectedText({
        text,
        startIndex,
        endIndex
      });
    }
  };
  
  const handleSaveAudio = (audioBlob: Blob) => {
    if (!selectedText) return;
    
    const audioUrl = URL.createObjectURL(audioBlob);
    
    onAddAnnotation({
      startIndex: selectedText.startIndex,
      endIndex: selectedText.endIndex,
      text: selectedText.text,
      audioUrl,
      author: "Current User" // In a real app, this would come from auth
    });
    
    setSelectedText(null);
    setIsRecording(false);
  };
  
  const handleCancelRecording = () => {
    setIsRecording(false);
  };
  
  const playAudio = (id: string, url: string) => {
    // Stop any currently playing audio
    if (audioPlaying) {
      audioRefs.current[audioPlaying].pause();
      audioRefs.current[audioPlaying].currentTime = 0;
    }
    
    // Play the new audio
    if (!audioRefs.current[id]) {
      audioRefs.current[id] = new Audio(url);
      
      audioRefs.current[id].addEventListener('ended', () => {
        setAudioPlaying(null);
      });
    }
    
    audioRefs.current[id].play();
    setAudioPlaying(id);
  };
  
  const pauseAudio = (id: string) => {
    if (audioRefs.current[id]) {
      audioRefs.current[id].pause();
      setAudioPlaying(null);
    }
  };
  
  // Function to render the text with highlighted annotations
  const renderTextWithAnnotations = () => {
    if (!content) return null;
    
    let lastIndex = 0;
    const segments = [];
    
    // Sort annotations by start index
    const sortedAnnotations = [...annotations].sort((a, b) => a.startIndex - b.startIndex);
    
    for (const ann of sortedAnnotations) {
      // Add text before this annotation
      if (ann.startIndex > lastIndex) {
        segments.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, ann.startIndex)}
          </span>
        );
      }
      
      // Add the annotated text
      segments.push(
        <Popover key={`annotation-${ann.id}`}>
          <PopoverTrigger asChild>
            <span 
              className="highlight rounded px-0.5 relative group"
              data-annotation-id={ann.id}
            >
              {content.substring(ann.startIndex, ann.endIndex)}
              {ann.audioUrl && (
                <span className="absolute -top-3 -right-2 bg-bookCafe-accent2 text-white rounded-full p-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  {audioPlaying === ann.id ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </span>
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-bookCafe-text/70">
                  Annotation by {ann.author}
                </span>
                <span className="text-xs text-bookCafe-text/60">
                  {ann.timestamp}
                </span>
              </div>
              
              {ann.audioUrl && (
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={() => 
                      audioPlaying === ann.id 
                        ? pauseAudio(ann.id) 
                        : playAudio(ann.id, ann.audioUrl!)
                    }
                  >
                    {audioPlaying === ann.id ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  <div className="text-sm">Listen to audio note</div>
                </div>
              )}
              
              <p className="text-sm italic">"{ann.text}"</p>
            </div>
          </PopoverContent>
        </Popover>
      );
      
      lastIndex = ann.endIndex;
    }
    
    // Add any remaining text
    if (lastIndex < content.length) {
      segments.push(
        <span key={`text-${lastIndex}`}>
          {content.substring(lastIndex)}
        </span>
      );
    }
    
    return segments;
  };

  return (
    <div className="relative">
      {/* Book content with annotations */}
      <div 
        className="book-paper relative my-6 text-lg font-serif leading-relaxed"
        onMouseUp={handleTextSelection}
      >
        {renderTextWithAnnotations()}
      </div>
      
      {/* Selected text actions */}
      {selectedText && !isRecording && (
        <div className="fixed bottom-5 right-5 animate-in fade-in slide-in z-30">
          <div className="cafe-card p-5">
            <h4 className="font-medium mb-3">Add note to selected text:</h4>
            <p className="text-sm mb-4 italic bg-bookCafe-highlight/30 p-2 rounded">
              "{selectedText.text}"
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5"
                onClick={() => setSelectedText(null)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                className="flex items-center gap-1.5 bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80"
                onClick={() => setIsRecording(true)}
              >
                <Mic className="h-4 w-4" />
                Record Audio Note
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Audio recorder */}
      {selectedText && isRecording && (
        <div className="fixed bottom-5 right-5 animate-in fade-in slide-in z-30 w-80">
          <div className="cafe-card p-0 overflow-hidden">
            <AudioRecorder 
              onSave={handleSaveAudio}
              onCancel={handleCancelRecording}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextWithAnnotations;
