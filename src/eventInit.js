import { openWeatherRequest } from "./openWeatherRequest.js";
import { weatherReport } from "./weatherReport.js";

const eventInit = (() => {

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
                weatherReport.getWeather(location.value);
                location.setCustomValidity('');
                location.reportValidity();
            }
            
            
        });

        
    }

    return {pageInit};
})();

export {eventInit};