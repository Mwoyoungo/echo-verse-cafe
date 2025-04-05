
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Headphones, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverEmoji: string;
  commentCount: number;
  audioCount: number;
}

const BookCard: React.FC<BookCardProps> = ({ 
  id, 
  title, 
  author, 
  coverEmoji, 
  commentCount, 
  audioCount 
}) => {
  return (
    <Link to={`/books/${id}`}>
      <Card className="cafe-card h-full overflow-hidden group">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <div className="text-7xl emoji-float mx-auto">
              {coverEmoji}
            </div>
          </div>
          <h3 className="font-serif font-semibold text-xl mb-2 group-hover:text-bookCafe-accent2 transition-colors">
            {title}
          </h3>
          <p className="text-bookCafe-text/70 text-sm">by {author}</p>
        </CardContent>
        <CardFooter className="border-t border-bookCafe-accent1/20 bg-bookCafe-paper/50 px-6 py-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center text-sm text-bookCafe-text/60">
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              <span>Read</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center text-xs text-bookCafe-text/60">
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                <span>{commentCount}</span>
              </div>
              <div className="flex items-center text-xs text-bookCafe-text/60">
                <Headphones className="h-3.5 w-3.5 mr-1" />
                <span>{audioCount}</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BookCard;
