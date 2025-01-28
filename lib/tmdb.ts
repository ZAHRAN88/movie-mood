const moodToGenres: { [key: string]: number[] } = {
    happy: [35, 16, 10751],    
    sad: [18, 10749],          
    excited: [28, 12, 878],   
    anxious: [53, 9648],       
    romantic: [10749],       
    angry: [28, 80],           
    nostalgic: [36, 10752]     
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