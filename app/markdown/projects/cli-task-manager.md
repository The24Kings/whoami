---
title: CLI Task Manager
date: 2026-04-02
tags: [python, cli]
desc: A command-line tool for managing a personal to-do list stored in a local JSON file.
---

## Overview

A lightweight CLI app to add, complete, and delete tasks without leaving the terminal.

## Usage

```bash
task add "Buy groceries"
task list
task done 1
task remove 2
```

## Tech Stack

- Python 3
- `argparse` for CLI parsing
- JSON file for persistence
