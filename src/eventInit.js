import { openWeatherRequest } from "./openWeatherRequest.js";
import { weatherReport } from "./weatherReport.js";
import { weatherUpdate } from "./weatherUpdate.js";

const eventInit = (() => {

    let isPageStart = false;

    const DEFAULT_CITY = 'dallas,tx,us';

    const pageInit = async () => {
        const locationSearch = document.querySelector('#search-button');
        const location = document.querySelector('#location-search');


        locationSearch.addEventListener('click', function() {
            
            const regex1 = /^[a-zA-z]+$/;
            const regex2 = /^[a-zA-z]+,[a-zA-z]{2}$/;
            const regex3 = /^[a-zA-z]+,[a-zA-z]+,[a-zA-z]{2}$/;

            if (!regex1.test(location.value) && !regex2.test(location.value) && !regex3.test(location.value)) {
                location.setCustomValidity('Please enter as {City}, {City,Country}, or {City,State,Country}');
                location.reportValidity();
            }
            else {
                weatherUpdate.updateWeather(location.value);
                location.setCustomValidity('');
                location.reportValidity();
            }

        });
          
        if (!isPageStart) {
            weatherUpdate.updateWeather(DEFAULT_CITY);
        }
    }

    return {pageInit};
})();

export {eventInit};