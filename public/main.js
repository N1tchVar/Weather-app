const API_KEY = import.meta.env.VITE_SECRET_KEY

let weather = {
  fetchWeather: function (city) {
      fetch (
          "https://api.openweathermap.org/data/2.5/weather?q=" 
          + city
          + "&units=metric&appid=" 
          + API_KEY
      )
          .then((response) => response.json())
          .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
      const { country } = data.sys; 
      const { name } = data;
      const { icon, description} = data.weather[0];
      const { temp } = data.main;
      const { speed } = data.wind;
      console.log(country,name,icon,description,temp,speed)
      document.querySelector(".city").innerHTML = country + ",  " + name;
      document.querySelector(".tempr").innerHTML = Math.round(temp) + "°C";
      document.querySelector(".weath-icon").src = 'https://openweathermap.org/img/wn/' + icon + '.png';
      document.querySelector(".detials").innerHTML = description.charAt(0).toUpperCase() + description.slice(1);
      document.querySelector(".wind").innerHTML = 'Wind speed is: ' + speed + " km/h 💨";
      document.querySelector('.weather').classList.remove('loading');
  },
  searchFunc: function () {
      this.fetchWeather(document.querySelector('.search-bar').value);
  }
};

document.querySelector('.search-content .search-logo').addEventListener('click', function() {
  weather.searchFunc();

})

document.querySelector('.search-bar').addEventListener('keyup', function(event) {
  if (event.key == 'Enter') {
      weather.searchFunc();
  }
})