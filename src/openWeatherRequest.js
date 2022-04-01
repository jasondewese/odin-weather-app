const openWeatherRequest = (() => {

    //@param location {string} city, county code, state code. No spaces
    const _apiRequest = async (location) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=380d5021392cb05faf4ef872ad04e3ef`,
        {mode: 'cors'}
        );
        const weatherData = await response.json();

        return weatherData;
    }

    const getWeather = async (location) => {
        const weatherReport = await _apiRequest(location);
        
        const weather = {
            name: weatherReport.name,
            main: weatherReport.weather[0].main,
            description: weatherReport.weather[0].description,
            temp: weatherReport.main.temp,
            feelsLike: weatherReport.main.feels_like,
            humidity: weatherReport.main.humidity,
            tempMax: weatherReport.main.temp_max,
            tempMin: weatherReport.main.temp_min,
            windSpeed: weatherReport.wind.speed,
            windDirection: weatherReport.wind.deg,
            windGust: weatherReport.wind.gust
        }

        console.log(weather);

        return weather;
        
    }



    return {getWeather};
})();

export {openWeatherRequest};