---
image: /article/me.jpg
title: Project Overview
date: 2025-05-24
tags: [Rust, TypeScript, Minecraft, C++, TCP/IP]
desc: An overview of major projects I have created and worked on.
---

<!-- markdownlint-disable-next-line MD025 -->
# Overview

## [Lurk Server](https://github.com/The24Kings/ZeldaServer)

> Server/ Client for a text based Dungeon Crawler game using the [Lurk Server Protocol](https://github.com/The24Kings/LurkProtocol/wiki/) created by S. Seth Long, Ph.D

The Lurk protocol is intended to support text-based MMORPG-style games, also known as MUDs (Multi-User Dimension).

It consists of 14 types of message, some of which are primarily sent by servers and some by clients. Behavior and game rules are primarily defined by the server, and clients should expect that their character may be updated with different health, location, and wealth at any time.

The server is responsible for all computation related to game rules, results of battles, or collecting gold. The client is responsible for communicating with the server and interacting with the player.

```TXT
 ______    _     _           _____ 
|___  /   | |   | |         / ____|                         
   / / ___| | __| | __ _   | (___   ___ _ ____   _____ _ __ 
  / / / _ \ |/ _` |/ _` |   \___ \ / _ \ '__\ \ / / _ \ '__|
 / /_|  __/ | (_| | (_| |   ____) |  __/ |   \ V /  __/ |   
/_____\___|_|\__,_|\__,_|  |_____/ \___|_|    \_/ \___|_|  

You find yourself standing in front of the gaping maw of a towering tree.
You hear a booming voice from above telling you to enter, but beware for danger lay ahead!

         @@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
  @@@@@@@@@@@@@@  '.@@@@@@@@@@@@@@@@@.--.@@@@@@@@@ 
    @@@@@@@@\   @@  Â¯ @@@@@@@@@@@ 'Â¯Â¯ ___..@@@@@@  
     @@@@@@@@|                 @    .'@@@@@@@@@@   
        @@@@@@\                    /@@@@@@@@  
               \                  / 
               |   .--'|__|'--.   |
               |  /.--'/  \'--.\  |
   __  ___     /      /____\      \     ___
 _(  )(   )_  |     .' .''. '.     |  _(   )__  __      __
(           )_|    |__/    \__|    |_(        )(  )_   (
             /                      \__             )_(Â¯
_______.---./    .'                    \_.--._ ___________
  --''Â¯        _/    __                       '--..       
             ''    .'
```

My Lurk Server was written primarily in Rust. The server is currently undergoing a complete rewrite from the ground up, however, the client currently only connects to the server and receives the [GAME](https://github.com/The24Kings/LurkProtocol/wiki/Messages:-Types#Game) and [VERSION](https://github.com/The24Kings/LurkProtocol/wiki/Messages:-Types#Version) messages.

---

## [BudgetCraft](https://github.com/The24Kings/BudgetCraft)

> Capstone Design Development Project

BudgetCraft is a Personal Finance Manager developed with [Ionic](https://ionicframework.com/) and [Firebase](https://firebase.google.com/).

As the Product Owner, my job in the scrum development framework, I am accountable for maximizing the value of the product resulting from the work of the Scrum Team. I am taking the stance of the Visionary to clearly communicate the product vision, strategy, business goals, and objectives with all the relevant parties.

![Budget Craft Poster](https://isoptera.lcsc.edu/~rjziegler/pictures/capstone-poster.png)

-# The poster we presented at the annual [LCSC Research Symposium](https://www.lcsc.edu/academic-affairs/research-symposium)

---

## [Normal Elevator](https://github.com/The24Kings/NormalElevator)

> Based on the popular GMOD map created by [PixelTail Games](https://www.pixeltailgames.com/elevator/) and heavily inspired by [ThePebblePrince](https://www.youtube.com/channel/UCHobjD55wR4c-5bD0AHDcEQ)

Normal Elevator is a multiplayer game made using Minecraft commands (scripting) that takes players to random wacky floors. These floors can consist of anything ranging from the jungle, to the middle of the desert, and back to an office building. Each player will be taken to 10 different floors, can you visit them all and find all their secrets?

![Minecraft Map](https://isoptera.lcsc.edu/~rjziegler/pictures/elevator_entrance.png)

-# The lobby for Normal Elevator.

---

## [Sine Approximation](https://github.com/The24Kings/Sine-Approximation)

Particle Swarm Optimizer (PSO) to train a Feed Forward Neural Network (FFNN) for the task of approximating the sine function. The main objective is to explore the capabilities of PSO in optimizing the weights of a neural network and achieving an accurate approximation of the sine wave. The problem is tackled by training a neural network to predict values of the sine function given a set of input values using a Mean Squared Error for particle fitness.

![Sin Wave](https://isoptera.lcsc.edu/~rjziegler/pictures/sine-approx.png)

-# The graphical output for the Sine Approximation program
-# Blue = Expected, Red = Predicted, Black = Particle Velocity

---

## [Website](https://github.com/The24Kings/whoami)

The source code for this website, which was built with React, TypeScript, and Vite; it serves as a portfolio of sorts for my various projects and applications
