import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import './App.css';
import SongQueue from './components/SongQueue';
import VideoPlayer from './components/VideoPlayer';
import { Song } from './interfaces/Song';

const App: React.FC = () => {
    const [songQueue, setSongQueue] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    const addSongToQueue = (song: Song) => {
        setSongQueue((prevQueue) => [...prevQueue, song]);
    };

    const removeSongFromQueue = (id: string) => {
        setSongQueue((prevQueue) => prevQueue.filter((song) => song.id !== id));
    };

    const playNextSong = () => {
        if (songQueue.length > 0) {
            const nextSong = songQueue[0]; // Get the next song from the queue
            setCurrentSong(nextSong); // Set it as the current song
            removeSongFromQueue(nextSong.id); // Remove it from the queue
        } else {
            setCurrentSong(null); // No songs left in the queue
        }
    };

    const onPlaySong = (song: Song) => {
        setCurrentSong(song); // Set the selected song as the current song
        removeSongFromQueue(song.id); // Remove it from the queue
    };

    return (
        <div className="App">
            <Homepage onAddSongToQueue={addSongToQueue} />
            <SongQueue 
                songs={songQueue} 
                onRemoveSong={removeSongFromQueue} 
                onPlaySong={onPlaySong} // Pass the onPlaySong prop
            />
            {currentSong && (
                <VideoPlayer
                    videoUrl={`https://www.youtube.com/watch?v=${currentSong.id}`}
                    onVideoEnded={playNextSong} // Pass the playNextSong function
                />
            )}
            {!currentSong && songQueue.length > 0 && (
                <button onClick={playNextSong}>Start Playing</button>
            )}
        </div>
    );
};

export default App;
