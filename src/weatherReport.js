import { openWeatherRequest } from "./openWeatherRequest";

const weatherReport = (() => {
    
    //stores current weather at [0], stores seven day summaries at [1-8]
    let weatherForecast = [];

    const _addCurrentWeather = (weatherData, weatherList) => {
        let date = new Date(weatherData.current.dt*1000);

        const currentWeather = {
            name: weatherData.name,
            main: weatherData.current.weather[0].main,
            day: date.getUTCDay(),
            description: weatherData.current.weather[0].description,
            temp: weatherData.current.temp,
            pressure: weatherData.current.pressure,
            feelsLike: weatherData.current.feels_like,
            humidity: weatherData.current.humidity,
            rain: weatherData.daily[0].pop,
            tempMax: weatherData.daily[0].temp.max,
            tempMin: weatherData.daily[0].temp.min,
            windSpeed: weatherData.current.wind_speed,
            windDirection: weatherData.current.wind_deg
        }

        weatherList.push(currentWeather);
    }

    const _addSevenDay = (weatherData, weatherList) => {
        //get forecast summary for next 7 days
        for (let i = 1; i <= 7; i++) {
                    
            let date = new Date(weatherData.daily[i].dt*1000);
            
            let dailyWeather = {
                dt: weatherData.daily[i].dt,
                day: date.getDay(),
                tempMax: weatherData.daily[i].temp.max,
                tempMin: weatherData.daily[i].temp.min,
                rain: weatherData.daily[i].pop,
                main: weatherData.daily[i].weather[0].main,
                description: weatherData.daily[i].weather[0].description,
            }

            weatherList.push(dailyWeather);
        }
    }

    const getWeather = async (location) => {
        const weatherReport = await openWeatherRequest.apiRequest(location);
                         
        _addCurrentWeather(weatherReport, weatherForecast);
        _addSevenDay(weatherReport, weatherForecast);
       
        console.log(weatherForecast);

        return weatherForecast;
        
    }



    return {getWeather};
})();

export {weatherReport};