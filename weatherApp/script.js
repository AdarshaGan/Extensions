document.addEventListener("DOMContentLoaded", function () {
    const lastCity = localStorage.getItem("lastCity");

    if (lastCity) {
        cityInput.value = lastCity; 
        fetchWeather(lastCity); 
    }

    document.getElementById("search").addEventListener("click", function() {
        const cityInput = document.getElementById("cityInput");

        if (!cityInput) {
            console.error("Element with ID 'cityInput' not found.");
            return;
        }
        
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            document.getElementById("weather").innerHTML = `<p>Oops! Try again :)</p>`;
        }
    });
});

async function fetchWeather(city){
    localStorage.setItem("lastCity", city);

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': '772a767370msh6c9d77fbf01a43cp1bc416jsnc8046ecedca7',
		    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        const city_name = result.location.name;
        const temp_f = result.current.temp_f;
        const temp_c = result.current.temp_c;

	    console.log(result);
        console.log(temp_f);

        document.getElementById("weather").innerHTML = 
        `<p>City: ${city_name}</p>
        <p>Weather: ${temp_f}°F</p>`;

    } catch (error) {
	    console.error(error);
    }
}
