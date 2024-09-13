import React, { useState } from 'react';
import './App.css';
import YouTube from 'react-youtube';
import debounce from 'lodash.debounce';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'AIzaSyAIR7_ncBYuYf1MeZzLSpWLnVLcnyWE0h8'; // Replace with your YouTube API key

  // Debounced search function
  const handleSearch = debounce(async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }
        const data = await response.json();
        setSuggestions(data.items || []);
        setError(null); // Clear error if successful
      } catch (error) {
        console.error('Error fetching data:', error);
        setSuggestions([]);
        setError('Limit nata sa qouta brother paabot napud ta next day kay limit raman ni. kaluwasan ramay libri');
      }
    } else {
      setSuggestions([]);
    }
  }, 300);
  

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const selectVideo = (videoId) => {
    if (videoId) {
      setVideoId(videoId);
      setSearchQuery('');
      setSuggestions([]);
      setError(null);
    } else {
      setError('Video is unavailable or invalid.');
    }
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="app">
      <h1>GWCF Official Music Player</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for music..."
          className="search-bar"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item) => (
              <li
                key={item.id.videoId}
                onClick={() => selectVideo(item.id.videoId)}
              >
                {item.snippet.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="error-message">{error}</p>} {/* Display error message if needed */}

      {videoId && !error && (
        <div className="video-container">
          <YouTube videoId={videoId} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default App;
