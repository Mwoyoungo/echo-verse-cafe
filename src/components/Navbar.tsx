
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Coffee, Upload, BookText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-bookCafe-accent1/30 shadow-sm">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <BookOpen className="h-7 w-7 text-bookCafe-accent2" />
            <Coffee className="h-5 w-5 text-bookCafe-accent2 absolute -bottom-1 -right-1" />
          </div>
          <span className="text-xl font-serif font-bold text-bookCafe-text">
            Book Cafe <span className="text-bookCafe-accent2">☕</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/library" className="flex items-center gap-1.5 text-bookCafe-text/80 hover:text-bookCafe-accent2 transition-colors">
            <BookText className="h-4 w-4" />
            <span>Library</span>
          </Link>
          <Link to="/upload" className="flex items-center gap-1.5 text-bookCafe-text/80 hover:text-bookCafe-accent2 transition-colors">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-1.5 text-bookCafe-text/80 hover:text-bookCafe-accent2 transition-colors">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="md:hidden">
            <Coffee className="h-5 w-5" />
          </Button>
          <Button className="bg-bookCafe-accent2 hover:bg-bookCafe-accent2/80">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
