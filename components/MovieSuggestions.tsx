import { motion } from 'framer-motion';
import { Card } from './ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export type Mood = 
  | 'happy' 
  | 'sad' 
  | 'excited' 
  | 'anxious' 
  | 'romantic' 
  | 'angry' 
  | 'nostalgic'
  | 'inspired'
  | 'adventurous'
  | 'relaxed'
  | 'mysterious'
  | 'thoughtful'
  | 'hopeful'
  | 'melancholic'
  | 'energetic'
  | 'scared'
  | 'peaceful'
  | 'curious'
  | 'comedy';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}


const moodColors = {
  happy: 'from-yellow-400 to-orange-500',
  sad: 'from-blue-400 to-blue-600',
  excited: 'from-purple-400 to-pink-500',
  anxious: 'from-green-400 to-teal-500',
  romantic: 'from-pink-400 to-red-500',
  angry: 'from-red-500 to-orange-600',
  nostalgic: 'from-indigo-400 to-purple-500',
  inspired: 'from-blue-500 to-indigo-600',
  adventurous: 'from-amber-400 to-orange-600',
  relaxed: 'from-teal-400 to-cyan-600',
  mysterious: 'from-violet-500 to-purple-700',
  thoughtful: 'from-slate-400 to-slate-600',
  hopeful: 'from-sky-400 to-blue-600',
  melancholic: 'from-neutral-400 to-neutral-600',
  energetic: 'from-rose-400 to-pink-600',
  scared: 'from-stone-500 to-stone-700',
  peaceful: 'from-emerald-400 to-green-600',
  curious: 'from-fuchsia-400 to-purple-600',
  comedy: 'from-fuchsia-100 to-purple-400',
};

export function MovieSuggestions({ mood }: { mood: Mood }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movies?mood=${mood}`);
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [mood]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center mb-8"
      >
        <div className={`bg-gradient-to-r ${moodColors[mood]} p-6 rounded-2xl shadow-lg w-full`}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {mood.charAt(0).toUpperCase() + mood.slice(1)} Movies
            </h3>
           {/*  <span className="text-3xl md:text-4xl" role="img" aria-label={mood}>
              {moodEmojis[mood]}
            </span> */}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 movie-grid"
      >
        {movies.map((movie, i) => (
          <motion.div
            key={`${movie.id}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="h-full w-full"
          >
            <Card className="group overflow-hidden bg-white dark:bg-gray-800/90 hover:shadow-xl transition-all duration-300 rounded-xl border-0 w-full">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-5 space-y-3">
                <h4 className="font-bold text-lg line-clamp-1  bg-clip-text bg-gradient-to-r dark:from-white dark:to-gray-300 transition-colors duration-300" 
                    title={movie.title}>
                  {movie.title}
                </h4>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {movie.overview}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full px-4 py-2.5 rounded-lg text-white text-sm font-medium
                    bg-gradient-to-r ${moodColors[mood]}
                    hover:shadow-lg hover:opacity-90 
                    transition-all duration-300
                    flex items-center justify-center space-x-2
                  `}
                >
                  <Link 
                    href={`https://egydeadw.sbs/?s=${movie.title.split(" ").join("+")}`}
                    target='_blank'
                    className="flex items-center space-x-2"
                  >
                    <span>Watch Now</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}