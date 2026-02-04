---
title: "Why this project exists"
date: "2026-02-03"
category: "ABOUT"
excerpt: "Audio guides fail for boring reasons. This project exists to fix those reasons, and nothing else. Learn why we started it and what to expect. "
author: "Mike Acler"
---

Most software projects don’t start with a vision statement.  
They start with a small, annoying problem that keeps showing up.

This one started with audio guides.

I run a popular guide on Barcelona [on web](https://mesto-barcelona.cz/en/) and [Instragram](https://www.instagram.com/mestobarcelona/), and I’ve been exploring ways to share my local knowledge with visitors through audio.

I was basically trying to scratch my own itch, and ended up with a project that I think is a good foundation for audio guides.

***

On paper, an audio guide is trivial.

And yes – there are [many](https://www.nubart.eu/) [solutions](https://www.stqry.com/) [on the market](https://www.museums22.com/) [for this](https://en.audio-cult.com/). But when I started exploring and testing them, I found that they all had their own set of problems.

What usually happens is one of two things: 

1. You either get a large expensive platform that tries to solve everything — CMS, QR codes, hosting, analytics, dashboards, payments, accounts — and becomes heavy, opaque, and difficult to escape.

2. Or you get something lightweight that looks fine in a demo, but in reality is half-baked and requires a lot of work to make it production-ready.

The problem to me was the absence of a solid, boring foundation. (Hey, being boring is fine!)

## The missing middle

There’s a gap between 'full platform' and 'hack it all yourself'.

That gap is where this project lives.

The goal is not to compete with platforms, and it’s definitely not to win on feature count. The goal is to provide a dependable, open-source audio guide player that handles the hard parts well and stays out of the way everywhere else.

That means focusing on things like:
- modern app working both online and offline
- easy installation, setup and content management
- predictable audio playback with support of [MediaSession API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- out of the box localization (not everyone speaks English)
- and last but not least, a great experience for both developers and end users (I'm a [product designer](https://linkedin.com/in/acler/) by trade and I am sick of bad UI/UX in audio guides!)

It also means being very deliberate about what *not* to build.

## What this project is (and isn’t)

This project is an audio guide player.

It plays audio. It lists stops. It remembers progress. It gives visitors option to share their feedback with the venue owner. It runs in a browser (beacuse it is more agnostic than a native app as it prevents vendor lock-in). You can host it yourself. You can read the code. You can change it in any way you want (it is [MIT licensed](https://en.wikipedia.org/wiki/MIT_License)).

But there is no CMS for editing content.  
There is also no hosting service for your data.  
This is not a universal solution for every tourism scenario.

Those are real problems, but they come with a different set of responsibilities: user management, permissions, infrastructure, compliance, and long-term operational guarantees. Mixing those concerns into the core would make the foundation weaker, not stronger.

Good software is defined as much by what it refuses to do as by what it does.

## Why open source

The [core audio guide player](https://github.com/audioguidekit/player-react) is open source for a practical reason.

Visitor-facing technology tends to outlive vendors. Museums, galleries, and cultural institutions plan in years, sometimes decades. A closed foundation is a long-term risk in that context. (And yet many of them are still using closed-source audio guides. From my experience it is because they are not aware of OSS solutions and the benefits these have.)

Making the core open source ensures a few important things:
- code is inspectable and transparent
- maintenance is not tied to a single vendor
- content remains easily editable and portable
- the software can keep running even if priorities change elsewhere

This isn’t about ideology. It’s about reducing long-term risk at the lowest possible layer.

And also making the solution of audio guides accessible even for smaller venues with no or limited budget.

---

## Scope, restraint, and saying no

From a product point of view, the fastest way to ruin any project is to *keep saying yes*.

Every yes increases surface area. More surface area means more bugs, more edge cases, and more time spent maintaining things that don’t directly improve the visitor experience.

So for the longterm, the rule for me is simple: solve one problem well.

Anything that doesn’t directly support that goal needs a very good reason to exist. Most things don’t have one.

That's why the core of this project is **to provide a solid foundation for anyone who wants to build audio guides**.

---
## About these notes

This section exists to document context and my thinkg about the space.

There’s no publishing schedule and no attempt to turn this into a feed. These notes are written for people who are using the project, evaluating it, or building on top of it.

I plan to write occassionally about design decisions, trade-offs, and ongoing work. Some entries could be technical. Others will explain why something obvious was deliberately not built.

If you ever wonder why something looks the way it does, the answer will probably show up here eventually.

---

If you like the project and its idea, consider supporting it by giving it a star on [GitHub](https://github.com/audioguidekit/player-react) or telling about it to someone who might find it useful.

Or you can just say hi to me on [X](https://twitter.com/agilek) or [Bluesky](https://bsky.app/profile/acler.bsky.social).