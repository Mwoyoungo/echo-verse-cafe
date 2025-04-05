
import React, { useState } from 'react';
import { Upload, FileText, BookOpen, FileType, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

interface FileUploaderProps {
  onUploadComplete: (text: string, fileName: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/rtf'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a text, PDF, Word or RTF file.",
      });
      return;
    }
    
    setFile(file);
  };

  const simulateTextExtraction = (file: File) => {
    setUploading(true);
    setProgress(0);
    
    // Simulate progress for a realistic feel
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // In a real app, we would use appropriate APIs to extract text from different file types
    // For now, let's simulate the process by reading text files directly and mocking others
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            setUploading(false);
            
            // The actual text content from the file
            const content = e.target.result as string;
            onUploadComplete(content, file.name);
            
            toast({
              title: "File uploaded successfully",
              description: `"${file.name}" has been converted to text.`,
            });
          }, 3000);
        }
      };
      reader.readAsText(file);
    } else {
      // For other file types (PDF, Word, etc.), simulate text extraction
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setUploading(false);
        
        // Mock extracted text based on file name
        const mockText = `This is the extracted content from "${file.name}". In a real application, we would use appropriate libraries or APIs to extract the actual text content from ${file.type} files.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.\n\nChapter 1: The Beginning\n\nIt was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way.`;
        
        onUploadComplete(mockText, file.name);
        
        toast({
          title: "File uploaded successfully",
          description: `"${file.name}" has been converted to text.`,
        });
      }, 3000);
    }
  };

  const resetFile = () => {
    setFile(null);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center ${
            dragActive ? 'border-bookCafe-accent2 bg-bookCafe-accent1/10' : 'border-bookCafe-accent1/50 hover:border-bookCafe-accent2/70 hover:bg-bookCafe-accent1/5'
          } transition-all duration-200`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-bookCafe-accent1/20 flex items-center justify-center text-bookCafe-accent2">
              <Upload className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold font-serif text-bookCafe-text">
                Upload your document
              </h3>
              <p className="text-sm text-bookCafe-text/70 max-w-md mx-auto">
                Drag and drop your book, poem, or document here, or click to browse. We support TXT, PDF, DOC/DOCX, and RTF files.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bookCafe-accent1/20 text-xs text-bookCafe-text/80">
                <FileText className="h-3.5 w-3.5" />
                <span>TXT</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bookCafe-accent1/20 text-xs text-bookCafe-text/80">
                <BookOpen className="h-3.5 w-3.5" />
                <span>PDF</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bookCafe-accent1/20 text-xs text-bookCafe-text/80">
                <FileType className="h-3.5 w-3.5" />
                <span>DOC/DOCX</span>
              </div>
            </div>
            
            <Button variant="default" className="bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80 mt-4">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".txt,.pdf,.doc,.docx,.rtf"
              />
              Browse Files
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-bookCafe-accent1/20 flex items-center justify-center text-bookCafe-accent2">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-bookCafe-text">{file.name}</h4>
                <p className="text-xs text-bookCafe-text/60">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            
            {!uploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFile}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {uploading ? (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-bookCafe-text/70 text-center">
                {progress < 100 
                  ? "Converting to text..." 
                  : "Processing complete"}
              </p>
            </div>
          ) : (
            <Button 
              className="w-full bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80"
              onClick={() => simulateTextExtraction(file)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload & Convert to Text
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
