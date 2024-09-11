import React, { useState } from 'react';
import './App.css';
import YouTube from 'react-youtube';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videoId, setVideoId] = useState(null);

  const handleSearch = async () => {
    const apiKey = 'AIzaSyD9coAqRL1IC0iAwm2HOhKNwsGVBUOvuy0'; // Replace with your YouTube API key
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        searchQuery
      )}&type=video&key=${apiKey}`
    );
    const data = await response.json();
    if (data.items.length > 0) {
      setVideoId(data.items[0].id.videoId); // Use the first result's video ID
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
      <h1>GWCF Official Music Player
      </h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for music..."
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
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
