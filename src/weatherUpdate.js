import { openWeatherRequest } from "./openWeatherRequest";
import { weatherReport } from "./weatherReport";

const weatherUpdate = (() => {

    const _getWeatherIcon = (weatherDescr) => {
        
        let weatherIcon;

        if (weatherDescr === 'Clouds') {
            weatherIcon = './../src/images/weather-cloudy.svg';
        }
        else if (weatherDescr === 'Clear') {
            weatherIcon = './../src/images/weather-sunny.svg';
        }
        else if (weatherDescr === 'Fog') {
            weatherIcon = './../src/images/weather-fog.svg';
        }
        else if (weatherDescr === 'Snow') {
            weatherIcon = './../src/images/weather-snowy.svg';
        }
        else if (weatherDescr === 'Rain') {
            weatherIcon = './../src/images/weather-pouring.svg';
        }
        else if (weatherDescr === 'Drizzle') {
            weatherIcon = './../src/images/weather-rainy.svg';
        }
        else if (weatherDescr === 'Thunderstorm') {
            weatherIcon = './../src/images/weather-lightning-rainy.svg';
        }
        else {
            //default for now if some other condition
            weatherIcon = './../src/images/weather-partly-cloudy.svg';
        }
        
        return weatherIcon;
    }

    const _getDay = (day) => {
        let today = 'Sun';
        
        if (day === 0) {
            today = 'Sun';
        }
        else if (day === 1) {
            today = 'Mon';
        }
        else if (day === 2) {
            today = 'Tue';
        }
        else if (day === 3) {
            today = 'Wed';
        }
        else if (day === 4) {
            today = 'Thur';
        }
        else if (day === 5) {
            today = 'Fri';
        }
        else if (day === 6) {
            today = 'Sat';
        }
        
        
        return today;
    }

    const updateWeather = async (location) => {

        let units;
        if (openWeatherRequest.getUnits() === 'imperial') {
            units = '\u00B0 F';
        }
        else {
            units = '\u00B0 C';
        }
        const weather = await weatherReport.getWeather(location);

        document.querySelector('#city').textContent = weather[0].name;
        document.querySelector('#current-weather-summary').textContent = weather[0].main;
        document.querySelector('#current-weather-icon').src = _getWeatherIcon(weather[0].main);
        document.querySelector('#current-temp').textContent = weather[0].temp+' '+units;
        document.querySelector('#current-low').textContent = 'Low: '+ weather[0].tempMin;
        document.querySelector('#current-high').textContent = 'High: ' + weather[0].tempMax;

        document.querySelector('#current-feels-like').textContent = weather[0].feelsLike;
        document.querySelector('#current-humidity').textContent = weather[0].humidity;
        document.querySelector('#current-rain-chance').textContent = weather[0].rain;
        let windUnits;
        if (openWeatherRequest.getUnits() === 'imperial') {
            windUnits = 'mph';
        }
        else {
            windUnits = 'km/h'
        }
        document.querySelector('#current-wind').textContent = weather[0].windSpeed+' '+windUnits;

        for (let i = 0; i < 8; i++) {
            document.querySelector('#day'+i).textContent = _getDay(weather[i].day);
            document.querySelector('#daily-weather-icon'+i).src = _getWeatherIcon(weather[i].main);
            document.querySelector('#high-temp' + i).textContent = 'H: ' + weather[i].tempMax;
            document.querySelector('#low-temp' + i).textContent = 'L: ' + weather[i].tempMin;
        }
    }

    return {updateWeather}
})();

export {weatherUpdate};