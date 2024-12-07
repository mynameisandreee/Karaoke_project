// SongQueue.tsx
import React from 'react';
import { Song } from '../interfaces/Song';
import '../styles/SongQueue.css'

interface SongQueueProps {
    songs: Song[];
    onRemoveSong: (id: string) => void; // Function to remove a song from the queue
    onPlaySong: (song: Song) => void; // Function to play a song
}

const SongQueue: React.FC<SongQueueProps> = ({ songs, onRemoveSong, onPlaySong }) => {
    return (
        <div className="songQueue">
            <h2 className="queueTitle">Song Queue</h2>
            {songs.length === 0 ? (
                <p className="noSongs">No songs in the queue.</p>
            ) : (
                <ul className="queueList">
                    {songs.map((song) => (
                        <li key={song.id} className="queueItem">
                            <div className="songInfo">
                                <span className="songTitle">{song.title}</span>
                                <span className="songArtist">{song.artist}</span>
                            </div>
                            <button className="playButton" onClick={() => onPlaySong(song)}>
                                Play
                            </button>
                            <button className="removeButton" onClick={() => onRemoveSong(song.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SongQueue;
