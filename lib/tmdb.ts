const moodToGenres: { [key: string]: number[] } = {
    happy: [35, 16, 10751],    
    sad: [18, 10749],          
    excited: [28, 12, 878],   
    anxious: [53, 9648],       
    romantic: [10749],       
    angry: [28, 80],           
    nostalgic: [36, 10752],     
    inspired: [99, 36, 10752], 
    adventurous: [12, 37, 14], 
    relaxed: [35, 10751, 16],  
    mysterious: [9648, 27, 53], 
    thoughtful: [878, 18, 99],  
    hopeful: [10751, 14, 12],  
    melancholic: [18, 10749, 36], 
    energetic: [28, 12, 35],    
    scared: [27, 53, 9648],     
    peaceful: [99, 10751, 16],  
    curious: [878, 9648, 14]    
  };
  
  const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
  
  export async function getMoviesByMood(mood: string) {
    const genreIds = moodToGenres[mood] || [];
    // Generate a random page number between 1 and 5
    const randomPage = Math.floor(Math.random() * 20) + 1;
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds.join(',')}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
  
      const data = await response.json();
      return data.results.slice(0, 9); 
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }