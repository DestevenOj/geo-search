let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature-section');
let locationHumidity = document.getElementById('humidity');
let locationWindSpeed = document.getElementById('wind-speed');
let locationPressure = document.getElementById('pressure');
const temperatureSpan = document.querySelector('.temperature-section span');

let cityName = document.getElementById('city-name');
let city = cityName.value;
// let cityHolder = document.getElementById('city-name')
let appId = 'd5c497e293875d0f73a43fed9b573ae2';
// gootle map key 
let mapId = 'AIzaSyBhwwJqT3bvyL2Ck2uFNWlv2ZYH8DfGOdw';

// When an input event is triggered update cityName
cityName.addEventListener('input', function updateValue(e) {
  city = e.target.value;
});

  document.getElementById("search-city").addEventListener("click", function(e) {
      e.preventDefault();
      console.log(city);

      // call for api by -- jquery ajax
      const api = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+ appId+'&units=imperial';
      $(document).ready(function(){ 
            // $('#search-city').click(function(){
            $.get(api, function(data, status){
                  // alert( status );
                  console.log(data);

                
                  //   create variables to store data from api objects
                  const {temp, pressure, humidity} = data.main;
                  const {speed} = data.wind;
                  const {description, icon} = data.weather[0];
                  const {lat, lon} = data.coord;

                
                  let newHumidity = humidity;
                  let newPressure = pressure;
                  let newWindSpeed = speed;

                  locationHumidity.textContent = newHumidity + " RH";
                  locationPressure.textContent = newPressure + " P";
                  locationWindSpeed.textContent = newWindSpeed + " knots";


                  // create variables to store values for lat and long
                  let townLatitude = lat;
                  let townLongitude = lon;

                  console.log(townLatitude);

                  // Initialize and add the map
          
                  // The location of searched town
                  let myTown = {lat: townLatitude, lng: townLongitude};
                  // The map, centered at searched town
                  let map = new google.maps.Map(
                      document.getElementById('map'), {zoom: 4, center: myTown});
                  // The marker, positioned at myTown
                  let marker = new google.maps.Marker({position: myTown, map: map})
                  
                            

                  const temperatureFahrenheit = temp;
        
                  //   set DOM Elements from the API
                  temperatureDegree.textContent = temperatureFahrenheit.toFixed(1);
                  temperatureDescription.textContent = description;
                  locationTimezone.textContent = data.name;


                  //   FORMULA FOR CELSIUS
                  let celsius = (temperatureFahrenheit - 32) * (5 / 9);
                  //   Set Icon

                  //   Change temperature to Celsius/Farenheit
                  temperatureSection.addEventListener('click', () => {
                      if(temperatureSpan.textContent === "°F"){
                          temperatureSpan.textContent = "℃";
                          temperatureDegree.textContent = celsius.toFixed(1);
            
                      } else {
                          temperatureSpan.textContent = "°F";
                          temperatureDegree.textContent= temperatureFahrenheit.toFixed(1);
                      }

                  });
            });
          });

          // select input content when clicked
          $("#city-name").click(function() {
              $(this).select()
          });
  }); 