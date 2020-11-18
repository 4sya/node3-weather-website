const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const port = process.env.PORT || 3000;

//defines path for express config
const publicDIRPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//Setup handlers bar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// setup static dir to serve
app.use(express.static(publicDIRPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pam Tanaval",
    msg: "Use this site to get your weather!",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Pam Tanaval",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "This is some helpful text.",
    name: "Pam Tanaval",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pam Tanaval",
    errorMsg: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`); //locally
});

// app.com  , app.com/help, app.com/about
