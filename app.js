const { response } = require("express");
const express = require("express");
const app = express();
const https =  require("https");
const bodyPaser = require("body-parser")




app.use(bodyPaser.urlencoded({extended: true}));



app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html")


app.post("/",function(req, res){

/*this line of code allows for the captured input of data from the end user and the line above allows for us to capture the data 
and helps structure the URL bellow*/
    
    const zip = req.body.zipCode;
    const url = ("https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=ccdf0d0852e400f43f5af85ae2672c3a&units=imperial")
    https.get(url, function(response){
        console.log(response.statusCode)
        
        
        
        
        response.on("data",function(data){
            /*grab weather data and parse it (make it readable) with the JSON.parse method*/
            const weatherData = JSON.parse(data)
            console.log(weatherData)
            
            /* you can get this info easy using the chrome extension json awesome*/
            
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
           /*this allows us to send the data back to the users browser*/
            res.write("<p>The weather is currently a " + weatherDescription +  "</p>")
            res.write("<h1>The Temperature in the " + zip + " zip code is " + temp + " degrees</h1> ");
            res.write("<img src=" + iconURL + ">")
            res.send()
        })
    })    
})
    

})




    









app.listen(3000, function(){
    console.log(" Server is running on port 3000.")
})
