const apiKey = "3f1d432043ff4cea892141510240204";
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-condition img");
const weatherContainer = document.querySelector(".weather-container");

// Initially hide the weather container
weatherContainer.style.display = "none";

function setWeatherBackground(condition) {
    // Remove existing weather elements
    const existingWrapper = document.querySelector('.weather-wrapper');
    if (existingWrapper) {
        existingWrapper.remove();
    }

    // Create new weather wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'weather-wrapper';
    document.body.appendChild(wrapper);

    condition = condition.toLowerCase();

    if (condition.includes('rain') || condition.includes('drizzle')) {
        // Create rain effect
        for (let i = 0; i < 100; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            wrapper.appendChild(drop);
        }
        document.body.style.background = 'linear-gradient(45deg, #1a1a2f, #2a2a4f, #3a3a6f)';
    } 
    else if (condition.includes('snow')) {
        // Create snow effect
        for (let i = 0; i < 50; i++) {
            const flake = document.createElement('div');
            flake.className = 'snow-flake';
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            flake.style.animationDelay = `${Math.random() * 2}s`;
            wrapper.appendChild(flake);
        }
        document.body.style.background = 'linear-gradient(45deg, #1a1a3f, #2a2a5f, #3a3a7f)';
    }
    else if (condition.includes('sunny') || condition.includes('clear')) {
        // Create sunny effect
        const sun = document.createElement('div');
        sun.className = 'sun';
        wrapper.appendChild(sun);
        document.body.style.background = 'linear-gradient(45deg, #4a90e2, #87ceeb, #4a90e2)';
    }
    else if (condition.includes('cloud') || condition.includes('overcast')) {
        // Create cloudy effect
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.left = `${Math.random() * 80 + 10}%`;
            cloud.style.top = `${Math.random() * 40 + 10}%`;
            cloud.style.animationDelay = `${Math.random() * 2}s`;
            wrapper.appendChild(cloud);
        }
        document.body.style.background = 'linear-gradient(45deg, #2c3e50, #3498db, #2c3e50)';
    }
}

async function checkWeather(city) {
    try {
        // Show loading state
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update the UI with weather data
        document.querySelector(".location span").innerHTML = `${data.location.name}, ${data.location.country}`;
        document.querySelector(".temperature span").innerHTML = Math.round(data.current.temp_c);
        document.querySelector(".weather-condition span").innerHTML = data.current.condition.text;
        document.querySelector(".humidity span").innerHTML = `${data.current.humidity}%`;
        document.querySelector(".wind span").innerHTML = `${data.current.wind_kph} km/h`;

        // Update weather icon - using WeatherAPI's icons
        weatherIcon.src = `https:${data.current.condition.icon}`;

        // Set weather background based on condition
        setWeatherBackground(data.current.condition.text);

        // Show the weather container
        weatherContainer.style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("City not found! Please check the city name and try again.");
        weatherContainer.style.display = "none";
    } finally {
        // Reset search button
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        alert("Please enter a city name");
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
}); 