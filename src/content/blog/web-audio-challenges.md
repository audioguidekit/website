---
title: "Why audio playback on the web is harder than it looks"
date: "2026-01-04"
category: "Engineering"
excerpt: "Exploring the nuances of mobile browser behavior, power management, and why your audio might stop playing when the screen goes dark."
author: "Audio Tour Team"
authorTwitter: "@audiotour_oss"
readingTime: "6 MIN READ"
---

Building an audio player for the web seems straightforward: use the `<audio>` tag and call `play()`. But when you move from a desk to the real world—walking through a city or a museum—the web starts to fight you.

## The Mobile Browser "Nap"

Modern mobile browsers are aggressive about saving battery. If a user locks their screen or switches to another app (like a map), the browser might decide to "suspend" your website's process. For a normal site, this is fine. For an audio guide, it means the audio stops exactly when the user starts walking.

```typescript
// Ensuring background playback works on iOS/Android
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Historic Walking Tour',
    artist: 'City Museum',
    artwork: [{ src: '/cover.jpg', sizes: '512x512', type: 'image/jpeg' }]
  });

  navigator.mediaSession.setActionHandler('play', () => audio.play());
  navigator.mediaSession.setActionHandler('pause', () => audio.pause());
}
```

## Spotty Connectivity

WiFi in museums is notoriously bad. Cellular data in historic city centers is often spotty. If your player relies on a constant stream, it will stutter. Our approach uses a robust caching layer that pre-fetches the next three tracks as soon as the guide starts, ensuring the "dead zones" don't kill the experience.

> "Reliability in the real world isn't about having the best network; it's about gracefully handling the worst one."

We'll be diving deeper into the Service Worker implementation in our next post. For now, check out the source code on GitHub to see how we handle these edge cases today.
