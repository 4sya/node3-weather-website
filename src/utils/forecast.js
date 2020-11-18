const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0e14dcdfb76f4ee50a32a4119b298d54&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}.It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}`
      );
    }
  });
};

module.exports = forecast;
