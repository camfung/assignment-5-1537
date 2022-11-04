ready(function () {
    function ajaxGET(url, callback){

        const xhr = new XMLHttpRequest();
        // console.log("xhr", xhr);
        xhr.onload = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                // console.log("responseText:" + xhr.responseText);
                callback(this.responseText);
            } else {
                // console.log("something went wrong")
                console.log(this.status)
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    document.querySelector("#get-names-json").addEventListener("click", function (e){
        ajaxGET("/get_names?format=json", function (data) {
            // this call is JSON so we have to parse it:
            let parsedData = JSON.parse(data);
            something = parsedData;

            let str = "<ol>"
            for (let i = 0; i < parsedData.length; i++) {
                str += "<li>" + parsedData[i] + "</li>";
            }
            str += "</ol>";
            document.querySelector("#names-info").innerHTML += str;
        });
    });

    document.querySelector("#get-names-html").addEventListener("click", function (e){
        ajaxGET("/get_names?format=html", function (data) {
            document.querySelector("#names-info").innerHTML += data;
        });
    });


    document.querySelector("#clear").addEventListener("click", function (e){
        document.getElementById("names-info").innerHTML = "";
    });


    document.querySelector("#get-schedule").addEventListener("click", function (e){
        ajaxGET("/get_schedule?format=html", function (data) {
            document.querySelector("#schedule-info").innerHTML += data;
        });
    });

    document.querySelector("#get-times-tables").addEventListener("click", function (e){
        let n = document.getElementById("number-input").value;
        ajaxGET("/get_times_tables?n="+n, function (data) {
            console.log(data)
            document.querySelector("#times-tables-info").innerHTML += data;
        });
    });


    document.querySelector("#get-curr-temp").addEventListener("click", function (e){
        ajaxGET("/get_curr_temp", function (data) {
            console.log(data)
            let url = "https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=-122.99&hourly=temperature_2m"
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let len = data.hourly.temperature_2m.length;
                for (let i = 0; i < len; i++){
                    console.log(data.hourly.temperature_2m[i], data.hourly.time[i])
                }
                // document.querySelector("#curr-temp-info").innerHTML = "the current temperature is: " + data.hourly.temperature_2m[len-1] + "&#8451";
            });
        });
    });


});

// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}