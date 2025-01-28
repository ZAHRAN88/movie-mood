'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MovieSuggestions, type Mood } from '@/components/MovieSuggestions';
import { Loader2, Film, Sparkles, PlayCircle, Heart, Star, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Footer } from '@/components/Footer';

const validMoods = [
  'happy', 
  'sad', 
  'excited', 
  'anxious', 
  'romantic', 
  'angry', 
  'nostalgic',
  'inspired',
  'adventurous',
  'relaxed',
  'mysterious',
  'thoughtful',
  'hopeful',
  'melancholic',
  'energetic',
  'scared',
  'peaceful',
  'curious'
] as const;

export default function Home() {
  const { toast } = useToast()
  const [input, setInput] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeMood = async () => {
      if (!input.trim()) {
          toast({
            title: '⚠️ Input Required',
            description: 'Please share how you are feeling first!',
            variant: 'destructive'
          });
        return;
      }

    setLoading(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Analysis failed');

      if (validMoods.includes(data.mood)) {
        setMood(data.mood as Mood);
        toast({
          title: '✨ Analysis Complete',
          description: `We've found some perfect movies for your mood!`,
          variant: 'default'
        });
      } else {
        console.warn('Received invalid mood:', data.mood);
        toast({ title: 'Error', description: 'Invalid mood response', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
          title: '❌ Analysis Failed',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
    
    const clearInput = () => {
        setInput('');
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-24 text-center sm:pt-32 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center space-x-3"
                >
                  <Film className="h-12 w-12 text-white" />
                  <h1 className="text-5xl sm:text-6xl font-bold text-white">
                    MoodFlix
                  </h1>
                </motion.div>
                  <p className="text-xl sm:text-2xl text-purple-50 max-w-xl mx-auto">
                    Discover movies that match your mood
                  </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                  <PlayCircle className="h-5 w-5" />
                  <span>Personalized Recommendations</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                  <Heart className="h-5 w-5" />
                  <span>Mood-Based Selection</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                  <Star className="h-5 w-5" />
                  <span>Top-Rated Films</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-400/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-400/30 rounded-full filter blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8 -mt-16 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 space-y-4 backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            How are you feeling today?
          </h2>
          <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share your mood with us (e.g., I just had a great day at work and want to celebrate!)"
                className="min-h-[120px] text-lg border-2 focus:border-purple-500 transition-colors pr-10"
                />
              {input && (
                <Button
                   onClick={clearInput}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                 >
                      <X className="h-5 w-5" />
                  </Button>
              )}
          </div>
          <Button
            onClick={analyzeMood}
            disabled={loading || !input.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity text-lg py-6"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing your mood...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Find Perfect Movies</span>
              </div>
            )}
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {mood && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MovieSuggestions mood={mood} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}