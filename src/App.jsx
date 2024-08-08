import { useState } from 'react';
import './App.css';
import SearchInput from './components/search/SearchInput';
import SearchBtn from './components/search/SearchBtn';

function App() {
  const [movie, setMovie] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '30bde18eb66fd4a1f7791fac1a3e8c65';
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for poster images

  const movieClick = async () => {
    if (!movie) return;
    setLoading(true);
    setError(null);
    setMovieData(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setMovie(value);
  };

  return (
    <>
      <div className="search">
        <SearchInput
          id="search"
          placeholder="Search your movie..."
          value={movie}
          onInputChange={handleInputChange}
        />
        <SearchBtn id="searchBtn" text="Search here" onClick={movieClick} />
      </div>
      <div className="results">
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {movieData && (
          <div className="movieGrid">
            {movieData.results && movieData.results.length > 0 ? (
              movieData.results.map((movie, index) => (
                <div className="movieCard" key={index}>
                  {movie.poster_path ? (
                    <img
                      src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="moviePoster"
                    />
                  ) : (
                    <div className="noImage">No Image Available</div>
                  )}
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
