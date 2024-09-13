import React, { useState } from 'react';
import './App.css';
import YouTube from 'react-youtube';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [videoId, setVideoId] = useState(null);

  const apiKey = 'AIzaSyD9coAqRL1IC0iAwm2HOhKNwsGVBUOvuy0'; // Replace with your YouTube API key

<<<<<<< HEAD
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
=======
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          e.target.value
        )}&type=video&key=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data.items);
    } else {
      setSuggestions([]); // Hide suggestions when search query is too short
    }
>>>>>>> e00852510e2a3a6d2386d3a16a57ac485c9546fb
  };

  const selectSong = (videoId) => {
    setVideoId(videoId);
    setSearchQuery('');
    setSuggestions([]); // Clear suggestions after a selection
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
      <h1>YouTube Music Player</h1>
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
