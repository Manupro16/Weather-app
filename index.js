import express from "express";
import axios from "axios";
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY_WEATHER_APP;
const PORT = process.env.PORT || 3000;
const API_URL = "https://api.weatherapi.com/v1/current.json"
let weatherData = {}
let errorMessage = {}

app.get("/", async (req,res) => {
    res.render("index.ejs", {
        weatherData: weatherData,
        errorMessage: errorMessage
    })
})


app.post("/temp-data", async (req,res) => {
    weatherData = {}
    errorMessage = {}

    try {
        const result = await axios.get(API_URL, { params: {
                key: API_KEY,
                q: req.body.newTemp,
                aqi: "no",
            } })

        weatherData.location = result.data.location
        weatherData.current = result.data.current

        res.redirect("/")


    } catch (error) {
        errorMessage.error = error.message + " No matching location found."
        res.redirect("/")
    }
})


app.listen(PORT, () => {
    console.log(`listening to localhost:${PORT}`)
})

