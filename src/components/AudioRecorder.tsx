
import React, { useState, useRef } from 'react';
import { Mic, Square, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface AudioRecorderProps {
  onSave: (audioBlob: Blob) => void;
  onCancel: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave, onCancel }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "Please allow access to your microphone to record audio notes.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSave = () => {
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      onSave(audioBlob);
    }
  };

  return (
    <div className="p-4 rounded-lg border border-bookCafe-accent1/30 bg-bookCafe-paper/70">
      <div className="text-center mb-3">
        <h3 className="font-medium text-bookCafe-text">
          {recording ? "Recording in progress..." : audioURL ? "Review your recording" : "Record your thoughts"}
        </h3>
      </div>
      
      {audioURL && (
        <div className="mb-4">
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
      
      <div className="flex justify-center gap-3">
        {recording ? (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={stopRecording}
            className="flex items-center gap-1.5"
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
        ) : audioURL ? (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
              className="flex items-center gap-1.5"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
              className="flex items-center gap-1.5"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={startRecording}
              className="flex items-center gap-1.5 bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80"
            >
              <Mic className="h-4 w-4" />
              Start Recording
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
