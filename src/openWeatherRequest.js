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
        
        return weatherReport;
        
    }


    return {getWeather};
})();

export {openWeatherRequest};