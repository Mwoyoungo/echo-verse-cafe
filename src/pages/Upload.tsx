
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import FileUploader from '@/components/FileUploader';
import { toast } from '@/components/ui/use-toast';

const Upload = () => {
  const [uploadedText, setUploadedText] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📚');
  
  const emojis = ['📚', '📖', '📝', '📜', '🔖', '📓', '📕', '📗', '📘', '📙', '🧠', '💭', '❤️', '🌟', '🎭', '🦅', '🐋', '🧙', '⚡', '💔', '🧢', '👁️'];
  
  const handleUploadComplete = (text: string, name: string) => {
    setUploadedText(text);
    setFileName(name);
    
    // Extract possible title and author from filename
    // Format could be "Title - Author.extension" or just "Title.extension"
    const fileNameWithoutExt = name.split('.').slice(0, -1).join('.');
    const parts = fileNameWithoutExt.split(' - ');
    
    if (parts.length > 1) {
      setTitle(parts[0]);
      setAuthor(parts[1]);
    } else {
      setTitle(fileNameWithoutExt);
    }
  };
  
  const handlePublish = () => {
    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title is required",
        description: "Please enter a title for your book.",
      });
      return;
    }
    
    // In a real app, we'd save to a database here
    toast({
      title: "Book published successfully!",
      description: "Your book has been added to the library.",
    });
    
    // Reset the form
    setUploadedText(null);
    setFileName(null);
    setTitle('');
    setAuthor('');
    setSelectedEmoji('📚');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto max-w-5xl px-4 py-8 flex-1">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-bookCafe-text text-center">
          Upload Your Book <span className="text-bookCafe-accent2">📝</span>
        </h1>
        
        {!uploadedText ? (
          <>
            <p className="text-center text-bookCafe-text/70 max-w-2xl mx-auto mb-10">
              Share books, poems, or documents with the Book Cafe community. Upload your file and we'll convert it to text that others can read and annotate with voice notes.
            </p>
            
            <FileUploader onUploadComplete={handleUploadComplete} />
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="cafe-card sticky top-24">
                <h3 className="text-xl font-serif font-semibold mb-6">
                  Book Details
                </h3>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter book title"
                      className="border-bookCafe-accent1/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Enter author name"
                      className="border-bookCafe-accent1/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cover Emoji</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`text-2xl p-2 rounded-md flex items-center justify-center transition-all ${
                            selectedEmoji === emoji
                              ? 'bg-bookCafe-accent2/20 ring-2 ring-bookCafe-accent2'
                              : 'hover:bg-bookCafe-accent1/20'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80 mt-6"
                    onClick={handlePublish}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Publish Book
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="cafe-card mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-semibold">
                    Preview
                  </h3>
                  <p className="text-sm text-bookCafe-text/70">
                    {fileName}
                  </p>
                </div>
                <div className="text-4xl">
                  {selectedEmoji}
                </div>
              </div>
              
              <div className="book-paper min-h-[60vh] text-lg font-serif leading-relaxed whitespace-pre-wrap">
                {uploadedText}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
