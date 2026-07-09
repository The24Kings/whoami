---
image: /article/deku_tree.png
title: Threading Through the Deku Tree over TCP/IP
date: 03/29/25
tags: [Rust, TCP/IP, Networking, Multi-thread]
desc: The architecture behind the server/ client applications for my Multi-user Dungeon game.
---

<!-- markdownlint-disable-next-line MD025 -->
# Overview

- What is a MUD
- Roles and responsibility for server/client
- Networking
- lurk protocol overview
- Basic server/ client (bind, listen/ connect, send)
- Single-thread/ multi-thread (channels/ pipes, concurrency, mutex)
- RUST!!!
- My approach (MPSC, one sever thread, many user threads)
- The iterations... (class project, the great re-write :tm:, sans-io)
- Testing, performance, planned features
