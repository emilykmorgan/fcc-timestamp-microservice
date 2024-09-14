// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require("cors");
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: "hello API"});
});

app.get("/api/:date?", function(req, res) {
  let dateParam = req.params.date;

  if (typeof dateParam == "undefined") {
    // if no date param

    let dateNow = Date.now();
    res.json({unix: dateNow, utc: new Date(dateNow).toUTCString()});
  } else {
    let date = new Date(dateParam);
    
    // check if date param is a valid date able to be parsed
    if (date == "Invalid Date") {
      // Check if date param is a UNIX Timestamp

      let dateParamInt = parseInt(dateParam);
      let dateFromInt = new Date(dateParamInt);

      if (dateFromInt == "Invalid Date") {
        // unable to get valid date from param

        res.json({error: "Invalid Date"});
      } else {
        // date param is a UNIX timestamp, return date info
        
        res.json({unix: dateFromInt.valueOf(), utc: dateFromInt.toUTCString()});
      }
    } else {
      res.json({unix: date.valueOf(), utc: date.toUTCString()});
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
