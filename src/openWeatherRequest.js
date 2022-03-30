const openWeatherRequest = (() => {

    const _apiRequest = async (location) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=380d5021392cb05faf4ef872ad04e3ef`,
        {mode: 'cors'}
        );
        const weatherData = await response.json();

        return weatherData;
    }

    const getWeather = async (reqLocation) => {
        const location = reqLocation;
        const weatherReport = await _apiRequest(location);
    
        console.log(weatherReport);
    }

    return {getWeather};
})();

export {openWeatherRequest};