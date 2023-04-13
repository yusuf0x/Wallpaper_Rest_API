const express = require("express");


const cors = require("cors");
const indexController = require('../controllers/indexController');
require("dotenv").config();
const middlewares = require("../utils/middlewares");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", indexController.index);
app.get("/wallpapers/popular", indexController.wallpapers);
app.get("/wallpapers/mobile", indexController.mobileWallpapers);
app.get("/avatars/popular", indexController.avatars);
app.get("/arts/popular", indexController.arts);
app.get("/pictures/popular", indexController.pictures);
app.get("/gifs/popular", indexController.gifs);
app.get("/games/popular", indexController.games);
app.get("/movies/popular", indexController.movies);
app.get("/tv_shows/popular", indexController.tvShows);


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
