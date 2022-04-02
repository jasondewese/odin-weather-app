const openWeatherRequest = (() => {

    let _units = 'imperial';
    let _currentLocation = '';
    //@param location {string} city, county code, state code. No spaces
    const changeUnits = () => {
        if (_units === 'imperial') {
            _units = 'metric';
            document.querySelector('.tempf').classList.remove('current-units');
            document.querySelector('.tempc').classList.add('current-units');
        }
        else {
            _units = 'imperial';
            document.querySelector('.tempf').classList.add('current-units');
            document.querySelector('.tempc').classList.remove('current-units');
        }
    }

    const getUnits = () => {
        return _units;
    }

    const getCurrentLocation = () => {
        return _currentLocation;
    }
    
    const apiRequest = async (location) => {
        
        _currentLocation = location;

        const shortWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=380d5021392cb05faf4ef872ad04e3ef`,
        {mode: 'cors'}
        );
        const shortWeatherData = await shortWeather.json();

        const locationLat = shortWeatherData.coord.lat;
        const locationLon = shortWeatherData.coord.lon;


        const longWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationLat}&lon=${locationLon}&exclude=alerts&appid=380d5021392cb05faf4ef872ad04e3ef&units=${_units}`,
        {mode: 'cors'}
        );

        const weatherData = await longWeather.json();
        weatherData.name = shortWeatherData.name;

        return weatherData;
       
    }
    return {apiRequest, changeUnits, getUnits, getCurrentLocation};
})();

export {openWeatherRequest};