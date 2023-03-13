const express = require("express");
const https = require("https");
const boyParser = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "somethingsomething";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {

      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = Math.round(weatherData.main.temp);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(temp);
      console.log(description);

      res.write("<p>The weather in " + query + " is curently " + description + ".</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees C.</h1>");
      res.write("<img src=" + imgURL + ">");

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
