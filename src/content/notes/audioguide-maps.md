---
title: "Map support for outdoor audio guides"
date: "2026-06-01"
category: "Product"
excerpt: "AudioGuideKit now includes map support for outdoor guides. Visitors can follow a route, see nearby stops, and orient themselves in space."
author: "Mike Acler"
readingTime: "3 min read"
---

Audio guides divide into two categories.

Indoor guides — museums, galleries, historic buildings — rely on numbered stops and room context. Visitors are already inside. The space is defined. Navigation is handled by the building itself.

Outdoor guides are different. A walking tour, a city trail, a heritage route — these exist in open space. Visitors need to understand where they are, where they're going, and how stops relate to each other in physical terms. Audio content alone cannot provide that.

Without a map, an outdoor audio guide is a playlist. It can play content in sequence, but it cannot orient a visitor in space.

With the latest update, AudioGuideKit now includes map support for outdoor guides.

***

The map renders a route and points of interest alongside the audio stops. Visitors can see the full guide at a glance, track their position as they move, and understand what is nearby — all without leaving the player.

By default, the map uses [Carto](https://carto.com/basemaps/) tiles in light or dark mode. No API key required. For projects that need custom styling or a different tile provider, you can supply your own keys for [MapTiler](https://www.maptiler.com/), [Mapbox](https://www.mapbox.com/), or any provider that follows the standard map tile specification.

The map is optional. Guides that do not need it — most indoor guides — are unaffected.

***

There is a trade-off worth stating.

Map support introduces a dependency on an external tile provider. That adds a network requirement. The Carto defaults work well and are free for most usage levels, but they are still a third-party service.

We chose this because an outdoor guide without a map is not a complete product for that use case. The dependency is worth it.

There is a longer-term goal here: fully offline maps.

In principle, this could work today. The PWA can cache map tile files locally, and serving tiles from the device rather than a remote provider is a known pattern. We have not tested it yet.

The harder problem is the pipeline. Creating offline-ready tile files is straightforward if you work in GIS. If you do not, it currently requires tools and knowledge that most audio guide creators do not have. That is the gap we want to close before shipping this — not the player-side implementation, but the tooling that lets you produce the content without needing a GIS background. 

***

When I was putting together sample map data for testing, I looked for a simple tool to draw a route and define points of interest. What I found were GIS editors — capable, but built for specialists. Bulky interfaces, complex export flows, terminology that assumes familiarity with geographic data formats. Not something a museum curator or a tour creator would sit down with comfortably.

There was no simple, focused tool for non-technical creators. So I built one.

[Polygrid](https://polygrid.dev) is a map data editor designed for content creators rather than GIS professionals. It is not released yet, but it will be open source when it is.

For now, any GeoJSON-compatible source works.

***

AudioGuideKit now covers the outdoor use case in a way it could not before. Visitors can orient themselves in space, follow a route, and understand what is nearby. The player is on [GitHub](https://github.com/audioguidekit/player-react).

Indoor guides are a different problem. There is more to build there. That work is separate from this.
