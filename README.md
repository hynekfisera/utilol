# Utility for League of Legends

## About

This is just a very simple project and my first experience with using Riot Games API. This app takes a server and a summoner name as an input, fetches match data and outputs your max count of deaths from the last 50 games - just for fun ;)

## How to use

1. Clone this repo
2. Install the dependencies using `npm install`
3. Create a [Riot Developer Account](https://developer.riotgames.com/) and generate an API key
4. Set up a CORS proxy (I used [this one](https://github.com/Rob--W/cors-anywhere)) and deploy it somewhere (I used [Heroku](https://www.heroku.com/))
5. Create a `.env` file
6. Add a `REACT_APP_RIOT` variable and set the value to your API key
7. Add a `REACT_APP_CORS` variable and set the value to your CORS proxy URL
8. Start the app using `npm start`
9. Pick your server and type your summoner name
10. Click Submit

## Problems you might run into

### 429 (Too Many Requests)

Both Riot Games API and Heroku have their limits when it comes to sending requests. If you run into this error just refresh the page and wait some time before clicking Submit again.
