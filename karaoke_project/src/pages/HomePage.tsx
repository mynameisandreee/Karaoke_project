import React, { useState } from 'react';

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    // Replace `YOUR_YOUTUBE_API_KEY` with your actual API key
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      searchQuery
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Karaoke System</h1>
      <div style={styles.searchBar}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a song..."
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>
      <div style={styles.results}>
        {searchResults.map((result) => (
          <div key={result.id.videoId} style={styles.resultItem}>
            <img
              src={result.snippet.thumbnails.default.url}
              alt={result.snippet.title}
              style={styles.thumbnail}
            />
            <div>
              <p style={styles.title}>{result.snippet.title}</p>
              <p style={styles.channel}>{result.snippet.channelTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  results: {
    marginTop: '20px',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  thumbnail: {
    width: '120px',
    height: '90px',
    marginRight: '10px',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  channel: {
    fontSize: '0.9rem',
    color: 'gray',
  },
};

export default Homepage;
