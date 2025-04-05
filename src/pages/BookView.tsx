
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Headphones, MessageCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TextWithAnnotations from '@/components/TextWithAnnotations';
import { toast } from '@/components/ui/use-toast';

// Mock book data
const mockBooks = {
  '1': {
    id: '1',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverEmoji: '📚',
    content: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"

"How so? How can it affect them?"

"My dear Mr. Bennet," replied his wife, "how can you be so tiresome! You must know that I am thinking of his marrying one of them."

"Is that his design in settling here?"`,
    annotations: [
      {
        id: 'a1',
        startIndex: 0,
        endIndex: 120,
        text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
        author: 'Emma Watson',
        timestamp: '2 days ago'
      },
      {
        id: 'a2',
        startIndex: 752,
        endIndex: 801,
        text: '"You want to tell me, and I have no objection to hearing it."',
        audioUrl: 'https://cdn.freesound.org/previews/686/686352_14005979-lq.mp3',
        author: 'Jane Smith',
        timestamp: '4 days ago'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverEmoji: '🎭',
    content: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought — frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.`,
    annotations: [
      {
        id: 'a1',
        startIndex: 84,
        endIndex: 208,
        text: '"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."',
        audioUrl: 'https://cdn.freesound.org/previews/686/686352_14005979-lq.mp3',
        author: 'John Doe',
        timestamp: '1 week ago'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverEmoji: '🦅',
    content: `When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh. He couldn't have cared less, so long as he could pass and punt.

When enough years had gone by to enable us to look back on them, we sometimes discussed the events leading to his accident. I maintain that the Ewells started it all, but Jem, who was four years my senior, said it started long before that. He said it began the summer Dill came to us, when Dill first gave us the idea of making Boo Radley come out.

I said if he wanted to take a broad view of the thing, it really began with Andrew Jackson. If General Jackson hadn't run the Creeks up the creek, Simon Finch would never have paddled up the Alabama, and where would we be if he hadn't? We were far too old to settle an argument with a fist-fight, so we consulted Atticus. Our father said we were both right.`,
    annotations: [
      {
        id: 'a1',
        startIndex: 531,
        endIndex: 596,
        text: 'He said it began the summer Dill came to us, when Dill first gave us the idea of making Boo Radley come out.',
        author: 'Sarah Johnson',
        timestamp: '3 days ago'
      }
    ]
  }
};

interface Annotation {
  id: string;
  startIndex: number;
  endIndex: number;
  text: string;
  audioUrl?: string;
  author: string;
  timestamp: string;
}

const BookView = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    // Simulate API call to fetch book data
    setTimeout(() => {
      if (bookId && mockBooks[bookId as keyof typeof mockBooks]) {
        const fetchedBook = mockBooks[bookId as keyof typeof mockBooks];
        setBook(fetchedBook);
        setAnnotations(fetchedBook.annotations || []);
      }
      setLoading(false);
    }, 800);
  }, [bookId]);

  const handleAddAnnotation = (newAnnotation: Omit<Annotation, 'id' | 'timestamp'>) => {
    const annotationWithId = {
      ...newAnnotation,
      id: `a${Date.now()}`,
      timestamp: 'Just now'
    };
    
    setAnnotations(prev => [...prev, annotationWithId]);
    
    toast({
      title: "Voice note added!",
      description: "Your voice note has been saved and is now visible to others."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-bookCafe-accent1/30 rounded-full mb-4"></div>
            <div className="h-6 bg-bookCafe-accent1/30 rounded w-64 mb-2"></div>
            <div className="h-4 bg-bookCafe-accent1/30 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif mb-4">Book not found</h2>
            <p className="mb-6 text-bookCafe-text/70">The book you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Book Header */}
      <div className="border-b border-bookCafe-accent1/30">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 text-bookCafe-accent2 hover:text-bookCafe-accent2/80"
          >
            <a href="/library">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Library
            </a>
          </Button>
          
          <div className="flex items-center gap-6">
            <div className="text-6xl emoji-float">{book.coverEmoji}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-bookCafe-text">
                {book.title}
              </h1>
              <p className="text-lg text-bookCafe-text/80">by {book.author}</p>
              
              <div className="flex gap-4 mt-4">
                <div className="flex items-center text-sm text-bookCafe-text/70">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Reading</span>
                </div>
                <div className="flex items-center text-sm text-bookCafe-text/70">
                  <Headphones className="h-4 w-4 mr-1" />
                  <span>{annotations.filter(a => a.audioUrl).length} Audio Notes</span>
                </div>
                <div className="flex items-center text-sm text-bookCafe-text/70">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{annotations.length} Annotations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8 flex-1">
        <TextWithAnnotations
          content={book.content}
          annotations={annotations}
          onAddAnnotation={handleAddAnnotation}
        />
      </div>
    </div>
  );
};

export default BookView;
