var bodyParser = require('body-parser');
module.exports = function (app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // your first API endpoint... 
    app.get("/api/hello", function (req, res) {
        res.json({ greeting: 'hello API' });
    });

    //to handle requests for current UTC timestamp
    app.get("/api/timestamp/", function (req, res) {

        var date = new Date();
        res.json({"unix": date.getTime(), "utc" : date.toUTCString() });

    })

    //to handle requests for UTC timestamp with date_string
    app.get("/api/timestamp/:date_string", function (req, res, next) {

        var date_string = req.params.date_string;

        if (!isNaN(date_string)) {
            //if date string is a number
            var date = new Date(parseInt(date_string));
            res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
        }else{

            next();

        }
    }, function (req, res) {
        
        var date_string = req.params.date_string;

        if (Date.parse(date_string)) {
            //if string can be parsed into a valid date object
            var date = new Date(Date.parse(date_string));       

            res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
        } else {
            res.json({"unix": "null", "utc" : "Invalid Date" });
        }

    });



}
