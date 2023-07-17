var apiKey = '59022ecce8e6f6ee80d2da7a1a24885a';
var inputEl = document.getElementById('user_entry');
var searchBtn = document.querySelector('button') ;
var prevSearch = document.getElementById('search_history')
var current = document.getElementById('main_display')
var forecast = document.getElementById('forecast')
var cityInfo = document.getElementById('city_info')
var searchStorage = JSON.parse(localStorage.getItem('prevSearch')) || []

searchHistory();

function getWeather(city) {
    fetch('api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json();
    })
    .then (function (data) {
        // icon
        var imgEl = document.createElement('img')
        imgEl.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png' 

        //name
        var cityEl = document.createElement('h2')
        cityEl.innerText = data.name
        current.appendChild(imgEl)
        current.appendChild(cityEl)

        //temp
        var tempEl = document.createElement('li')
        tempEl.innerText = 'Temperature (F): ' + data.main.temp 

        //humidity
        var humidEl = document.createElement('li')
        humidEl.innerText = 'Humidity (%): ' + data.main.humidity

        //wind speed
        var windEl = document.createElement('li')
        windEl.innerText = 'Wind Speed (mph): ' + data.main.humidity
        
        //append stats to ul
        cityInfo.appendChild(tempEl)
        cityInfo.appendChild(humidEl)
        cityInfo.appendChild(windEl)
        addSearchHistory(city)
        searchHistory()
        forecastDisplay()

    })
    .catch (function (error) {
        console.error('Error code:', error)
    })
}

function forecastDisplay(data) {
    var arrayEl = data.list
 
    for(var i = 0; i<arrayEl.length; i+=8 ) {
        // icon
        var imgEl = document.createElement('img')
        imgEl.src = 'https://openweathermap.org/img/wn/' + arrayEl[i].weather[0].icon + '.png' 
        //Date

        var dateEl = document.createElement('h5')
        dateEl.innerText = arrayEl[i].dt_txt.split('')[0]

        //temp
        var tempEl = document.createElement('li')
        tempEl.innerText = 'Temperature (F): ' + arrayEl[i].main.temp 

        //humidity
        var humidEl = document.createElement('li')
        humidEl.innerText = 'Humidity (%): ' + arrayEl[i].main.humidity

        //wind speed
        var windEl = document.createElement('li')
        windEl.innerText = 'Wind Speed (mph): ' + arrayEl[i].main.humidity
 
        var forecastCard = document.createElement('div')
        forecastCard.classList.add('forecastCard')
        forecastCard.appendChild(imgEl)
        forecastCard.appendChild(dateEl)
        forecastCard.appendChild(tempEl)
        forecastCard.appendChild(humidityEl)
        forecastCard.appendChild(windEl)
        forecast.appendChild(forecastCard)
    }
}

//
//Listeners
//

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (inputEl.value === '') {
        return;
    } else {
    getWeather(inputEl.value.trim());
    }
})



//
//storage functions
//

function addSearchHistory(input) {
    searchStorage.push(input) // adds or builds the searchStorage array
    localStorage.setItem('prevSearch',JSON.stringify(prevSearch))
}

function getSearchHistory(prevSearch) {
    var output = localStorage.getItem(prevSearch)
    return JSON.parse(output)
}

function searchHistory() {
    var previousSearches = document.getElementById('search_history')
    previousSearches.innerHTML = ''
    
    if (getSearchHistory('prevSearch')) {
        console.log('okay')
    }
    
}