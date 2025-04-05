
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';

const books = [
  {
    id: '1',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverEmoji: '📚',
    commentCount: 12,
    audioCount: 8
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverEmoji: '🎭',
    commentCount: 9,
    audioCount: 5
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverEmoji: '🦅',
    commentCount: 15,
    audioCount: 10
  },
  {
    id: '4',
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    coverEmoji: '💔',
    commentCount: 7,
    audioCount: 4
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverEmoji: '🧢',
    commentCount: 11,
    audioCount: 6
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    coverEmoji: '👁️',
    commentCount: 14,
    audioCount: 9
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverEmoji: '🧙',
    commentCount: 18,
    audioCount: 12
  },
  {
    id: '8',
    title: 'Moby Dick',
    author: 'Herman Melville',
    coverEmoji: '🐋',
    commentCount: 5,
    audioCount: 3
  },
  {
    id: '9',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    coverEmoji: '⚡',
    commentCount: 8,
    audioCount: 6
  }
];

const Library = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Library Header */}
      <div className="bg-bookCafe-accent1/10 border-b border-bookCafe-accent1/30">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-bookCafe-text">
            Library <span className="text-bookCafe-accent2">📚</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookCafe-text/60 h-4 w-4" />
              <Input 
                placeholder="Search for books, authors, or topics..." 
                className="pl-9 bg-white border-bookCafe-accent1/30 focus-visible:ring-bookCafe-accent2"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="whitespace-nowrap">
                Filter
              </Button>
              <Button variant="outline" className="whitespace-nowrap">
                Sort By: Recent
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Books Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-8 flex-1">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
