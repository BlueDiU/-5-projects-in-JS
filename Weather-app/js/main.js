APIKEY = '3265874a2c77ae4a04bb96236a642d2f';

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

class Weather {
  constructor() {
    this.form = document.getElementById('form');
    this.main = document.getElementById('main');
    this.search = document.getElementById('search');
  }

  async getWeatherByLocation(city) {
    const res = await fetch(url(city) , { origin: 'cors' });
    const dataResp = await res.json();

    this.addWeatherToPage(dataResp);
  }

  addWeatherToPage(data) {
    const temp = this.KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C 
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        </h2>
        <small>${data.weather[0].main}</small>
    `;

    // Cleanup
    this.main.innerHTML = '';

    this.main.appendChild(weather);
  }

  KtoC(K) {
    return Math.floor(K - 273.15);
  }
}

const w = new Weather();

w.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = w.search.value;

  if (city) {
    w.getWeatherByLocation(city);
  }
});
