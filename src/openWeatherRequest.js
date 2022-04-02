const openWeatherRequest = (() => {

    //@param location {string} city, county code, state code. No spaces
    const apiRequest = async (location) => {
        
        
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
    return {apiRequest};
})();

export {openWeatherRequest};