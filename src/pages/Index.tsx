
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Upload, Headphones, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';

const featuredBooks = [
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-bookCafe-text">
                <span className="text-bookCafe-accent2">Book Cafe</span> - Where Literature Comes to Life 📚✨
              </h1>
              <p className="text-lg mb-8 text-bookCafe-text/80">
                Upload books or poems, highlight passages, and record voice notes to share your thoughts with fellow students.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload a Book
                </Button>
                <Button variant="outline" size="lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Library
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-bookCafe-accent1/30 flex items-center justify-center relative">
                  <div className="text-9xl emoji-float">📚</div>
                  <div className="absolute -top-10 right-0 text-5xl emoji-float">☕</div>
                  <div className="absolute -bottom-5 left-5 text-5xl emoji-float">🎧</div>
                  <div className="absolute top-10 -left-8 text-4xl emoji-float">📝</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="px-4 py-16 bg-bookCafe-accent1/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">How Book Cafe Works 🔍</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="cafe-card flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 rounded-full bg-bookCafe-accent1/30 flex items-center justify-center">
                <Upload className="h-8 w-8 text-bookCafe-accent2" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Upload & Convert</h3>
              <p className="text-bookCafe-text/80">
                Upload books, poems, or documents in various formats. We'll convert them to text for easy reading and annotation.
              </p>
            </div>
            
            <div className="cafe-card flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 rounded-full bg-bookCafe-accent1/30 flex items-center justify-center">
                <Headphones className="h-8 w-8 text-bookCafe-accent2" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Highlight & Record</h3>
              <p className="text-bookCafe-text/80">
                Highlight passages of text and record voice notes to share your thoughts, analysis, or questions.
              </p>
            </div>
            
            <div className="cafe-card flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 rounded-full bg-bookCafe-accent1/30 flex items-center justify-center">
                <Users className="h-8 w-8 text-bookCafe-accent2" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Listen & Learn</h3>
              <p className="text-bookCafe-text/80">
                Explore what others have shared, listen to voice notes, and gain new perspectives on your favorite texts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold">Featured Books 📖</h2>
            <Link to="/library" className="text-bookCafe-accent2 hover:underline flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredBooks.map(book => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-bookCafe-accent1/20 to-bookCafe-accent2/20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to Share Your Voice? 🎙️</h2>
          <p className="text-lg mb-8 text-bookCafe-text/80">
            Join our community of readers and contribute your unique perspective through voice annotations.
          </p>
          <Button size="lg" className="bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80">
            Get Started Today
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-4 py-8 border-t border-bookCafe-accent1/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-bookCafe-accent2" />
              <span className="text-lg font-serif font-bold text-bookCafe-text">
                Book Cafe <span className="text-bookCafe-accent2">☕</span>
              </span>
            </div>
            <div className="text-sm text-bookCafe-text/70">
              © 2025 Book Cafe. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
