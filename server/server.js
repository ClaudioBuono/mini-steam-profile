var express = require('express')
var cors = require('cors');
const { default: axios } = require('axios');
const { response } = require('express');
var app = express()
var request = require('request');
require("dotenv").config()

app.use(cors({origin: true}));


// apiKey and SteamID hidden in .env file
const apiKey = process.env.REACT_APP_API_KEY
const steamID = process.env.REACT_APP_STEAM_ID

const URL_RECENT_GAMES = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key="+apiKey+"&steamid="+steamID+"&format=json"
const URL_USER = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+apiKey+"&steamids="+steamID+""
const URL_USER_PAGE = "https://steamcommunity.com/profiles/"+steamID+"/"
const URL_COUNT_GAMES = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key="+apiKey+"&steamid="+steamID+""
const URL_LEVEL = "https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key="+apiKey+"&steamid="+steamID+""

app.get("/getRecentlyPlayed", async (req,res) => {

  request(URL_RECENT_GAMES, function(error, response, body) {
        res.send(body)
    });

});

app.get("/getUserInfos", async (req,res) => {

  request(URL_USER, function(error, response, body) {
      res.send(body)
  });

});

app.get("/getUserPage", async (req,res) => {

  request(URL_USER_PAGE, function(error, response, body) {
      res.send(body)
  });

});

app.get("/getUserCountGames", async (req,res) => {

  request(URL_COUNT_GAMES, function(error, response, body) {
      res.send(body)
  });

});

app.get("/getUserLevel", async (req,res) => {

  request(URL_LEVEL, function(error, response, body) {
      res.send(body)
  });

});


app.listen(5000,function(){
  console.log("listening on port 5000")
})