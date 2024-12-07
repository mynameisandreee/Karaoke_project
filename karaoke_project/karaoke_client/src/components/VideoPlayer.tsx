import React, { useEffect } from 'react';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface VideoPlayerProps {
    videoUrl: string | null;
    onVideoEnded: () => void; // Callback for when the video ends
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onVideoEnded }) => {
    const videoId = videoUrl ? videoUrl.split('v=')[1]?.split('&')[0] : null; // Extract video ID from URL
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : '';

    useEffect(() => {
        if (!videoId) return; // Early return if there's no video ID

        const onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player('player', {
                height: '315',
                width: '560',
                videoId,
                events: {
                    'onStateChange': (event:any) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            onVideoEnded(); // Call the onVideoEnded callback
                        }
                    },
                },
            });
        };

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Load the YouTube IFrame Player API
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

        return () => {
            // Cleanup the script tag
            const scriptTags = document.getElementsByTagName('script');
            for (let i = 0; i < scriptTags.length; i++) {
                if (scriptTags[i].src === tag.src) {
                    scriptTags[i].parentNode?.removeChild(scriptTags[i]);
                }
            }
        };
    }, [videoId, onVideoEnded]); // Add onVideoEnded to the dependencies array

    return (
        <div className="videoPlayer">
            {videoId ? <div id="player"></div> : <p>No video selected.</p>} {/* Display message if no video */}
        </div>
    );
};

export default VideoPlayer;
