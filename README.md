
# Full Plan for Karaoke System in React Using YouTube Videos

## **Phase 1: Setting Up the Environment**
### Initialize Project:
1. Create a new React app using `create-react-app` or Vite.
2. Install dependencies:
   ```bash
   npm install react-youtube react-router-dom styled-components
   ```

### Set Up Routing:
1. Use `react-router-dom` to structure routes (e.g., Home, Search, Player).

---

## **Phase 2: YouTube Integration**
### Embed YouTube Videos:
1. Use `react-youtube` to add an iframe-based YouTube player.
2. Configure props like `videoId` for embedding specific videos.

### Control Playback:
1. Add play, pause, and volume controls.
2. Use the YouTube API's player methods to sync video playback with other features.

---

## **Phase 3: Lyrics Management**
### Structure Lyrics Data:
1. Create a JSON file for storing lyrics with timestamps:
   ```json
   [
     {
       "time": 5,
       "text": "Is this the real life?"
     },
     {
       "time": 10,
       "text": "Is this just fantasy?"
     }
   ]
   ```

### Sync Lyrics with Video:
1. Use `player.getCurrentTime()` to fetch the current time of the video.
2. Match the current time with the `time` field in the JSON to display the correct lyric.

### Highlight Active Lyric:
1. Update the UI dynamically by adding a `current` class to the active lyric.

---

## **Phase 4: Build the UI**
### Design Components:
1. **Search Page:**
   - Allow users to search for YouTube videos using the YouTube Data API.
2. **Player Page:**
   - Display the YouTube video on top.
   - Show scrolling lyrics synced with the video below.
3. **Home Page:**
   - Showcase trending karaoke videos or recently used ones.

### Styling:
1. Use `styled-components` or CSS for modern and clean designs.
2. Ensure responsive design for desktop and mobile.

---

## **Phase 5: Additional Features**
### User-Uploaded Lyrics:
1. Allow users to upload `.txt` or `.srt` files for custom lyrics.
2. Parse and store these files in the application state.

### Search Functionality:
1. Use the YouTube Data API to fetch videos based on user input.
2. Show search results with thumbnails and titles.

### Pitch Detection (Optional):
1. Use the Web Audio API to analyze user audio input.
2. Implement scoring by comparing user pitch to the original audio.

### User Profiles (Optional):
1. Add user accounts for saving favorite songs or creating playlists.

---

## **Phase 6: Testing**
### Component Testing:
1. Test individual components using libraries like React Testing Library or Jest.

### Integration Testing:
1. Ensure the synchronization between video playback and lyrics works smoothly.

---

## **Phase 7: Deployment**
### Host the Application:
1. Use platforms like Netlify, Vercel, or AWS Amplify for deployment.

### Set Up API Keys:
1. Securely store YouTube API keys using environment variables.

---

## **Proposed Project Structure**
```
src/
├── components/
│   ├── SearchBar.jsx
│   ├── VideoPlayer.jsx
│   ├── LyricsDisplay.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── SearchPage.jsx
│   ├── PlayerPage.jsx
├── assets/
│   ├── styles/
│   ├── images/
├── utils/
│   ├── fetchYouTubeData.js
│   ├── syncLyrics.js
├── App.jsx
├── index.jsx
```

---

## **Timeline**
- **Week 1:** Set up the project environment and integrate YouTube API.
- **Week 2:** Build the lyrics management system and sync it with the video.
- **Week 3:** Design the UI and implement search functionality.
- **Week 4:** Add optional features (pitch detection, user profiles) and test thoroughly.
- **Week 5:** Finalize and deploy the application.
