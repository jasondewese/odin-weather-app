const openWeatherRequest = (() => {

    //@param location {string} city, county code, state code. No spaces
    const _apiRequest = async (location) => {
        
        
        const shortWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=380d5021392cb05faf4ef872ad04e3ef`,
        {mode: 'cors'}
        );
        const shortWeatherData = await shortWeather.json();

        const locationLat = shortWeatherData.coord.lat;
        const locationLon = shortWeatherData.coord.lon;

        const longWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationLat}&lon=${locationLon}&exclude=alerts&appid=380d5021392cb05faf4ef872ad04e3ef&units=imperial`,
        {mode: 'cors'}
        );

        const weatherData = await longWeather.json();
        weatherData.name = shortWeatherData.name;

        return weatherData;
       
        
    }

    const getWeather = async (location) => {
        const weatherReport = await _apiRequest(location);
           
        console.log(weatherReport);
        
        //list to store current weather, and 7 day forecast
        let weather = [];
        
        let date = new Date(weatherReport.current.dt*1000);

        const currentWeather = {
            name: weatherReport.name,
            main: weatherReport.current.weather[0].main,
            day: date.getUTCDay(),
            description: weatherReport.current.weather[0].description,
            temp: weatherReport.current.temp,
            pressure: weatherReport.current.pressure,
            feelsLike: weatherReport.current.feels_like,
            humidity: weatherReport.current.humidity,
            rain: weatherReport.daily[0].pop,
            tempMax: weatherReport.daily[0].temp.max,
            tempMin: weatherReport.daily[0].temp.min,
            windSpeed: weatherReport.current.wind_speed,
            windDirection: weatherReport.current.wind_deg
        }

        weather.push(currentWeather);

        //get forecast summary for next 7 days
        for (let i = 1; i <= 7; i++) {
            
            date = new Date(weatherReport.daily[i].dt*1000);
            
            let dailyWeather = {
                dt: weatherReport.daily[i].dt,
                day: date.getDay(),
                tempMax: weatherReport.daily[i].temp.max,
                tempMin: weatherReport.daily[i].temp.min,
                rain: weatherReport.daily[i].pop,
                main: weatherReport.daily[i].weather[0].main,
                description: weatherReport.daily[i].weather[0].description,
            }

            weather.push(dailyWeather);
        }

       
        console.log(weather);

        return weather;
        
    }



    return {getWeather};
})();

export {openWeatherRequest};