var apiKey = '59022ecce8e6f6ee80d2da7a1a24885a';
var inputEl = document.getElementById('user_entry');
var searchBtn = document.querySelector('button') ;
var prevSearch = document.getElementById('search_history')
var current = document.getElementById('main_display')
var forecast = document.getElementById('forecast')


searchHistory();

function getWeather(city) {
    fetch('api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey)
    .then(function(response) {
        return response.json();
    })
    .then (function (data) {
        // document.k 
        var cityEl = document.createElement('h2')
        cityEl.innerText = data.name
        current.appendChild(cityEl)
        
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