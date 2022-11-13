const { resolveSoa } = require("dns");
const { response } = require("express");
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
const fs = require("fs");

const weatherApiKey = ""

app.use("/scripts", express.static("./public/scripts"))
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf-8")
    res.send(doc);
});

app.get("/get_schedule", function (req, res) {
    let formatOfResponse = req.query["format"];

    if (formatOfResponse == "html"){
        res.setHeader("Content-type", "text/html")
        let doc = fs.readFileSync("./app/data/schedule.html");
        res.send(doc);
    }
});

app.get("/get_names", (req, res) => {
    let formatOfResponse = req.query["format"];

    if (formatOfResponse == "json"){
        res.setHeader("Content-type", "application/json");
        res.send(fs.readFileSync("./app/data/names.js", "utf8"));

    } else if (formatOfResponse == "html"){
        res.setHeader("Content-type", "text/html");
        let doc = fs.readFileSync("./app/data/names.html", "utf-8")
        res.send(doc);
    }
});

app.get("/get_times_tables", (req, res) => {
    let n = req.query.n;
    console.log(n)

    let data = "<table>";
    

    for (let i = 1; i <= n ; i++){
        data += "<tr>"
        for (let j = 1 ; j <= n; j++){
            data += "<td>" + i * j + "</td>"
        }
        data += "</tr>"
    }
    data += "</table>"

    res.send(data);
});

app.get("/get_curr_temp", (req, res) => {
    axios({
        method: 'get',  
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=49&lon=-123&exclude=minutely,daily,alerts&appid=${weatherApiKey}&units=metric`
    })
.then(response => {
    let hourly = response.data.hourly; 
    let hourly_temp = []
    for (let i = 0; i < 12; i++){
      ele = hourly[i];
      var myDate = new Date(ele.dt * 1000);
      var pstDate = myDate.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles"
      })
      .slice(-11, -9);
      // let hour = pstDate.slice(-11, -9);
      // let len = pstDate.length;
      // let timeOfDay = pstDate.slice(len-2, len);
      hourly_temp.push({
          x: parseInt(pstDate),
          y: ele.temp
      })
      }
      res.send(hourly_temp)
})
})


let port = 8000;
app.listen(port, function () {
    console.log("example app listening on port: " + port)
});
