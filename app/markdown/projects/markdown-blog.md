---
title: Markdown Blog Engine
date: 2026-03-15
tags: [node, express, markdown]
desc: A minimal blog engine that renders markdown files as HTML pages served via Express.
---

## Overview

A Node.js server that reads `.md` files from a directory and serves them as styled HTML pages.

## Features

- Auto-discovers posts from the filesystem
- Converts markdown to HTML using `marked`
- Simple index page listing all posts

## Tech Stack

- Node.js + Express
- `marked` for markdown parsing
- Plain HTML/CSS for templating
