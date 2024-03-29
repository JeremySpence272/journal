
# Personal Journal App

#### Hello World ! 
This is my personal journaling app that I made a few months ago.

If you want to see it it is hosted with vercel at [journal272.vercel.app](https://journal272.vercel.app/)


## Project Description
This was a personal project that I made to help me keep myself organized and do a recap of my day each day.

The idea is it would be used each night. 
There are four sections that can be filled in
- To-do list for the next day
- Recap of major things accomplished from this day
- Notes from reading
- Anything else you want to keep track of

The project uses
- HTML
- CSS
- node.js
- Javascript

## Highlight Unique Aspects:

There's also another page that will allow you to check off the different completed to-do list tasks that you uploaded the previous day.

All of this was stored in *Firebase realtime database* so it could be searched through at a later date. Specifically useful for book notes.

**I don't recommend using this yourself however because I haven't set up the project for more than one user or the ability to log-in so the database doesn't know that you aren't me!**


## Resources Needed:

The only resource you'll need to run this project on your own computer is Node.js otherwise you will run into *cross-site scripting issues*. This just means that your web browser won't run the code to access files on your computer for security reasons.

To do this you will have to download Node.js if you don't have it already:
    https://nodejs.org/en/download

Instructions are in the next section for setting up the local server.


## Getting Started:

1. Next you will want to install the http-server with 
    npm install http-server -g

2. Finally you will want to navigate to the project folder and run the set up the local page with
    http-server

3. Now you'll be able to access the index.html file at something like `http://127.0.0.1:8080/`


## Caveats & Warnings:

This is a pretty simple web app you likely won't run into any issues running it. 

I will warn you again that this is a personal app I made. I do not recommend that you run it or use it as it should be used. There's no security measures for the firebase database & no users or authentication set up!

