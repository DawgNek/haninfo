# Integrating Spotify into My Portfolio

One of the coolest features of my portfolio is the Spotify integration. Here’s how I built it!

## The Idea

I wanted visitors to see what I’m currently listening to and experience music as part of the overall vibe of my portfolio.

## Challenges

### 1. Spotify API Authentication

The OAuth flow was a bit tricky to implement. I had to handle:

* Access token refreshing
* Secure storage of credentials
* Rate limiting

### 2. Real-Time Updates

Keeping the “Now Playing” data up to date without overloading the API.

```javascript id="k3d9x1"
// Polling strategy
const REFRESH_INTERVAL = 30000; // 30 seconds
export default REFRESH_INTERVAL;

useEffect(() => {
    const interval = setInterval(fetchNowPlaying, REFRESH_INTERVAL);
    return () => clearInterval(interval);
}, []);
```

## Visualizer

The audio visualizer was the most fun part! I used the Web Audio API to create responsive animations.

### Core Components:

* **Audio Context**: Manages audio processing
* **Analyser Node**: Provides frequency data
* **Canvas**: Renders the visuals

## Embedding Spotify

For tracks I want to showcase, I used Spotify’s iFrame embed:

```html id="m8s2qp"
<iframe 
    src="https://open.spotify.com/embed/track/xxx"
    allow="encrypted-media"
/>
```

## Styling Tips

* Match the player colors with your theme
* Add subtle hover effects
* Ensure responsive layout

## Final Result

This integration adds a personal touch to my portfolio and showcases my passion for both music and technology.

Check out the [Music Page](/music)! 🎵
