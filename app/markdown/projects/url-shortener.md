---
title: URL Shortener
date: 2026-01-08
tags: [go, rest, sqlite]
desc: A self-hosted URL shortener with a REST API and a tiny SQLite database.
---

## Overview

A Go service that maps short slugs to long URLs and redirects visitors on request.

## Endpoints

| Method | Path         | Description          |
|--------|--------------|----------------------|
| POST   | `/shorten`   | Create a short link  |
| GET    | `/:slug`     | Redirect to long URL |
| DELETE | `/:slug`     | Remove a link        |

## Tech Stack

- Go (standard library)
- SQLite via `mattn/go-sqlite3`
- JSON request/response

### Hello

test

#### Hi again

test
