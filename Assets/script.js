var apiKey = '59022ecce8e6f6ee80d2da7a1a24885a';
var inputEl = document.getElementById('user_entry');
var searchBtn = document.querySelector('button') ;
var current = document.getElementById('main_display')
var forecast = document.getElementById('forecast')
var cityInfo = document.getElementById('city_info')
var searchStorage = JSON.parse(localStorage.getItem('searchStorage')) || []

// searchHistory();

function getWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json();
    })
    .then (function (data) {
        // icon
        current.innerHTML = ""

        var imgEl = document.createElement('img')
        imgEl.src = 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png' 

        //name
        var cityEl = document.createElement('h2')
        cityEl.innerText = data.city.name

        //date
        var dateEl = document.createElement('p')
        var date = new Date(data.list[0].dt*1000)
        dateEl.innerText = date.toDateString()

        //temp
        var tempEl = document.createElement('li')
        tempEl.innerText = 'Temperature (F): ' + data.list[0].main.temp 

        //humidity
        var humidEl = document.createElement('li')
        humidEl.innerText = 'Humidity (%): ' + data.list[0].main.humidity

        //wind speed
        var windEl = document.createElement('li')
        windEl.innerText = 'Wind Speed (mph): ' + data.list[0].wind.speed
        
        //append stats to ul

        current.appendChild(imgEl)
        current.appendChild(cityEl)
        current.appendChild(dateEl)
        current.appendChild(tempEl)
        current.appendChild(humidEl)
        current.appendChild(windEl)

        addSearchHistory()
        searchHistory()

        weatherData = data
        forecastDisplay()

    })
    // .catch (function (error) {
    //     console.error('Error code:', error)
    // })
}

function forecastDisplay() {
    forecast.innerHTML = ""

    for(var i = 0; i<weatherData.list.length; i+=8 ) {
        // icon
        var imgEl = document.createElement('img')
        imgEl.src = 'https://openweathermap.org/img/wn/' + weatherData.list[i].weather[0].icon + '.png' 
       
        //Date
        var dateEl = document.createElement('p')
        var date = new Date(weatherData.list[i].dt*1000)
        dateEl.innerText = date.toDateString()

        //temp
        var tempEl = document.createElement('li')
        tempEl.innerText = 'Temperature (F): ' + weatherData.list[i].main.temp 

        //humidity
        var humidEl = document.createElement('li')
        humidEl.innerText = 'Humidity (%): ' + weatherData.list[i].main.humidity

        //wind speed
        var windEl = document.createElement('li')
        windEl.innerText = 'Wind Speed (mph): ' + weatherData.list[i].wind.speed
 
        var forecastCard = document.createElement('div')
        forecastCard.classList.add('forecastCard')
        forecastCard.appendChild(imgEl)
        forecastCard.appendChild(dateEl)
        forecastCard.appendChild(tempEl)
        forecastCard.appendChild(humidEl)
        forecastCard.appendChild(windEl)
        forecast.appendChild(forecastCard)
    }
}


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

function addSearchHistory() {
    var history = inputEl.value.trim()
    searchStorage.push(history) // adds or builds the searchStorage array
    localStorage.setItem('searchStorage',JSON.stringify(searchStorage))
}

function getSearchHistory(searchStorage) {
    var output = localStorage.getItem(searchStorage)
    return JSON.parse(output)
}

function searchHistory() {
     var previousSearches = document.getElementById('search_history')
     previousSearches.innerHTML = ''
    searchStorage = getSearchHistory('searchStorage')

    if (searchStorage) {
        searchStorage.reverse() 

        for (var i = 0; i < searchStorage.length; i++) {
        
          var btnEl = document.createElement('button')
          btnEl.innerText = searchStorage[i]

          btnEl.addEventListener('click', function () {
          inputEl.value= this.textContent // replaces user entry with history value
          getWeather(this.textContent)
          })
          previousSearches.appendChild(btnEl)

        }
    
    }
}