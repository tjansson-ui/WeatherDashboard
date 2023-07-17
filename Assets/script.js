var apiKey = '59022ecce8e6f6ee80d2da7a1a24885a';
var inputEl = document.getElementById('user_entry');
var searchBtn = document.querySelector('button') ;
var prevSearch = document.getElementById('search_history')
var current = document.getElementById('main_display')
var forecast = document.getElementById('forecast')
var cityInfo = document.getElementById('city_info')

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
    })
    .catch (function (error) {
        console.error('Error code:', error)
    })
}


searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    getWeather(inputEl.value);
})

function searchHistory() {
    var prevSearch = document.getElementById('search_history')
    searchStorage = JSON.parse(localStorage.getItem('prevSearch'))
}