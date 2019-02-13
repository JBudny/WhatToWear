// "stringsEN.js"

const uiStrings = {
  appTitle:"Welcome to WhatToWear",
  cardTitles: {
    weather:"Weather info",
    picture:"Clothing picture",
    recommendation:"What to wear?"
  },
  inputTitle: "Type your city",
  weatherParams: {
    icon:"Weather icon:",
    city:"City: ",
    country:"Country: ",
    forecast:"Forecast: ",
    main:"Main: ",
    temp:"Temperature: ",
    minTemp:"Min temperature: ",
    maxTemp:"Max temperature: ",
    humidity:"Humidity: ",
    pressure:"Pressure: "
  },
  notifications:{
    criticalError:{
      title:"CRITICAL ERROR:",
      message:"MESSAGE: ",
      stack:"STACK: "
    },
    info:{
      title:"INFO: ",
      support:"Your browser doesn't support Geolocation_API",
      ipInfo: ". The weather is based on your IP and can be inacurate."
    },
    additions:{
       weatherData:" weather data.",
       ipData:" your ip data. You can try to type your city by hand."
    }
  },
  clothesData:[
    {cloth:'warmHat',minTemp:'-20',maxTemp:'8',description:'Winter hat'},
    {cloth:'winterJacket',minTemp:'-20',maxTemp:'8',description:'Winter jacket'},
    {cloth:'thickGloves',minTemp:'-20',maxTemp:'5',description:'Winter gloves'},
    {cloth:'warmPants',minTemp:'-20',maxTemp:'8',description:'Winter pants'},
    {cloth:'scarf',minTemp:'-20',maxTemp:'10',description:'Scarf'},
    {cloth:'sweater',minTemp:'-20',maxTemp:'10',description:'Sweater'},
    {cloth:'warmSocks',minTemp:'-20',maxTemp:'10',description:'Warm socks'},
    {cloth:'winterShoes',minTemp:'-20',maxTemp:'10',description:'Winter shoes'},
    {cloth:'cap',minTemp:'16',maxTemp:'50',description:'Cap'},
    {cloth:'springJacket',minTemp:'9',maxTemp:'15',description:'Spring jacket'},
    {cloth:'jeans',minTemp:'9',maxTemp:'23',description:'Jeans'},
    {cloth:'hoodie',minTemp:'11',maxTemp:'23',description:'Hoodie'},
    {cloth:'boatSocks',minTemp:'11',maxTemp:'50',description:'Boat socks'},
    {cloth:'regularShoes',minTemp:'11',maxTemp:'23',description:'Regular shoes'},
    {cloth:'tShirt',minTemp:'24',maxTemp:'50',description:'T-shirt'},
    {cloth:'shorts',minTemp:'24',maxTemp:'50',description:'Shorts'},
    {cloth:'sandals',minTemp:'24',maxTemp:'50',description:'Sandals'},
    {cloth:'raincoat',minTemp:'-20',maxTemp:'50',rain:'1',description:'Raincoat'},
    {cloth:'wellingtons',minTemp:'-20',maxTemp:'50',rain:'1',description:'Wellingtons'},
    {cloth:'umbrella',minTemp:'-20',maxTemp:'50',rain:'1',description:'Umbrella'}
  ]
}

export default uiStrings
