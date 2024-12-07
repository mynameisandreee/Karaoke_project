import React, { useState } from 'react';
import SongQueue from './SongQueue';
import Homepage from '../pages/Homepage';
import { Song } from '../interfaces/Song';

const KaraokeApp: React.FC = () => {
    const [songQueue, setSongQueue] = useState<Song[]>([]);

    const addSongToQueue = (song: Song) => {
        setSongQueue((prevQueue) => {
            const newQueue = [...prevQueue, song];
            console.log('Updated song queue:', newQueue); // Log the updated queue
            return newQueue;
        });
    };
    

    const removeSongFromQueue = (id: string) => {
        setSongQueue((prevQueue) => prevQueue.filter((song) => song.id !== id));
    };

    return (
        <div>
            <h1>Karaoke Application</h1>
            <Homepage onAddSongToQueue={addSongToQueue} />
            <SongQueue songs={songQueue} onRemoveSong={removeSongFromQueue} onPlaySong={function (song: Song): void {
                throw new Error('Function not implemented.');
            } } />
        </div>
    );
};

export default KaraokeApp;