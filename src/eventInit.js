import { openWeatherRequest } from "./openWeatherRequest.js";

const eventInit = (() => {

    const pageInit = async () => {
        const locationSearch = document.querySelector('#search-button');
        const location = document.querySelector('#location');


        locationSearch.addEventListener('click', function() {
            openWeatherRequest.getWeather(location.value);
        });
    }

    return {pageInit};
})();

export {eventInit};