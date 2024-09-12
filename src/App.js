import React, { useState, useCallback } from 'react';
import './App.css';
import YouTube from 'react-youtube';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [videoId, setVideoId] = useState(null);

  const apiKey = 'AIzaSyD9coAqRL1IC0iAwm2HOhKNwsGVBUOvuy0'; // Replace with your YouTube API key

  // Adding useCallback with proper dependencies
  const fetchSuggestions = useCallback(async () => {
    if (searchQuery.length > 2) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            searchQuery
          )}&type=video&key=${apiKey}`
        );
        const data = await response.json();
        setSuggestions(data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, apiKey]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const selectSong = (videoId) => {
    setVideoId(videoId);
    setSearchQuery('');
    setSuggestions([]);
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
          onChange={handleSearch}
          placeholder="Search for music..."
          className="search-bar"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item) => (
              <li
                key={item.id.videoId}
                onClick={() => selectSong(item.id.videoId)}
              >
                {item.snippet.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {videoId && (
        <div className="video-container">
          <YouTube videoId={videoId} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default App;
