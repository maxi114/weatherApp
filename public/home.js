$(document).ready(function(){
    //coordinates
    var lat;
    var long;
    
    //temprature
    var ftemp;
    var temp = true;
    
    //wind
    var kmhwindspeed;
    var wind = true;
    
    //geolocation of the computer
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude;
        long = position.coords.longitude;
        
       //variable to take the api
        var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long + "";
        
       $.getJSON(api, function(data){
         //function to get all the weather details
         
         console.log(data)
         
         //weather
         var sky =  data.weather[0].description;
         var ctemp = data.main.temp.toFixed(0);
         var windspeed = data.wind.speed;
         var city = data.name;
         var country = data.sys.country;
         var icon = data.weather[0].icon

         
         //change temp to fahrenheit
         ftemp = (ctemp *(9/5) + 32).toFixed(0);
         
         //change windspeed from m/s to mph
         windspeed = (2.37 * windspeed).toFixed(0);
         
         //change windspeed from mph to km/h
         kmhwindspeed = (windspeed * 1.60934).toFixed(0);
         
         //target the html classes
         $(".sky").html(sky);
         $(".location").html(city + ", " + country) ;
         $('.icon').css('background-image', 'url(' + icon + ')');
         $(".temp").html(ctemp + " &#8451");
         $(".wind").html("wind " +kmhwindspeed + " km/h")
   
         //click function to change the temprature units
         $(".temp").click(function(){
           
           if(temp === true){
             $(".temp").html(ftemp + " &#8457");
           return  temp = false;}
           
           if(temp ===false){
             $(".temp").html(ctemp+ " &#8451");
             return temp =true;
           }
           
         })
         
         //click function to change the windspeed units
         $(".wind").click(function(){
           
           if(wind === true){ 
             $(".wind").html("wind " + windspeed + " mph");
             return wind = false;
           }
           
           if(wind === false){
            $(".wind").html("wind " + kmhwindspeed + " km/h");
             return wind = true;
           }
         })
       })
      })
    }
  })