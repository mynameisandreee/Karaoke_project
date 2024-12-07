import React, { useState } from 'react';
import '../styles/Homepage.css'; // Correctly import the CSS file
import { Song } from '../interfaces/Song';

interface HomepageProps {
    onAddSongToQueue: (song: Song) => void; // Function to add a song to the queue
}

const Homepage: React.FC<HomepageProps> = ({ onAddSongToQueue }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!searchQuery) return;

        const apiKey = 'AIzaSyCAsodtrOjZv0J3fPA2J97JBMRdAc1QD8k'; // Replace with your actual API key
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

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAddSong = (result: any) => {
        const song: Song = {
            id: result.id.videoId,
            title: result.snippet.title,
            artist: result.snippet.channelTitle, // Assuming channel title as artist
        };
        onAddSongToQueue(song); // Call the function to add the song
    };
    

    return (
        <div className="container">
            <h1 className="heading">Karaoke System</h1>
            <div className="searchBar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for a song..."
                    className="input"
                />
                <button onClick={handleSearch} className="button">
                    Search
                </button>
            </div>
            <div className="results">
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <div key={result.id.videoId} className="resultItem">
                            <img
                                src={result.snippet.thumbnails.default.url}
                                alt={result.snippet.title}
                                className="thumbnail"
                            />
                            <div className="resultInfo">
                                <p className="title">{result.snippet.title}</p>
                                <p className="channel">{result.snippet.channelTitle}</p>
                                <button className="addButton" onClick={() => handleAddSong(result)}>
                                    Add to Queue
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="noResults">No results found. Try a different search!</p>
                )}
            </div>
        </div>
    );
};

export default Homepage;
