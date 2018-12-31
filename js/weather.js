(function(){
    if(localStorage.getItem("email")=="" || localStorage.getItem("email")==null || localStorage.getItem("email")==undefined){
      console.log(localStorage.getItem("email"));
    //location.href = "../components/weather.html";
    window.location.href = '../index.html';
    }




  document.getElementById('dispName').innerHTML = localStorage.getItem("fname")+" "+localStorage.getItem("lname");

  let zipCodeUrl = `http://api.zippopotam.us/us/${localStorage.getItem("zip")}`;
  console.log(zipCodeUrl);
  fetch(zipCodeUrl).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data.places[0]["place name"]);
  var loc = data.places[0]["place name"]

console.log(loc);
  let url = 'http://api.openweathermap.org/data/2.5/find?q=';
  let apiKey = '&appid=42bf56045362d93a1a06220fbf369906';
  let units = '&units=metric';
  let apiUrl = url+loc+apiKey+units;
  console.log(apiUrl);
  fetch(apiUrl).then(response => {
  return response.json();
  }).then(data => {
  // Work with JSON data here

  var weatherData = data.list[0];
  console.log(weatherData);
    document.getElementById('cityName').innerHTML = weatherData.name;
    const img = document.createElement("IMG");
    img.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    document.getElementById('icon').src=img.src;
    document.getElementById('temp').innerHTML = weatherData.main.temp+" °C";
    document.getElementById('condition').innerHTML = weatherData.weather[0].description;
    document.getElementById('temp_max').innerHTML = weatherData.main.temp_max+" °C";
    document.getElementById('temp_min').innerHTML = weatherData.main.temp_min+" °C";
    document.getElementById('humidity').innerHTML = weatherData.main.humidity+"%";
    document.getElementById('pressure').innerHTML = weatherData.main.pressure+" hPa";
  })
})
})()



//get weather
function getWeather(){
  let loc = document.getElementById("loc").value;
  console.log(loc);
  let url = 'http://api.openweathermap.org/data/2.5/find?q=';
  let apiKey = '&appid=42bf56045362d93a1a06220fbf369906';
  let units = '&units=metric';
  let apiUrl = url+loc+apiKey+units;
  console.log(apiUrl);
  //loadJson(apiUrl, gotData);
  fetch(apiUrl).then(response => {
  return response.json();
  }).then(data => {

  var weatherData = data.list[0];
  console.log(weatherData);
    document.getElementById('cityName').innerHTML = weatherData.name;
    const img = document.createElement("IMG");
    img.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    document.getElementById('icon').src=img.src;
    document.getElementById('temp').innerHTML = weatherData.main.temp+" °C";
    document.getElementById('condition').innerHTML = weatherData.weather[0].description;
    document.getElementById('temp_max').innerHTML = weatherData.main.temp_max+" °C";
    document.getElementById('temp_min').innerHTML = weatherData.main.temp_min+" °C";
    document.getElementById('humidity').innerHTML = weatherData.main.humidity+"%";
    document.getElementById('pressure').innerHTML = weatherData.main.pressure+" hPa";
  })
}


//logout

function logout(){
  localStorage.clear();
  window.location = '../index.html';
}
