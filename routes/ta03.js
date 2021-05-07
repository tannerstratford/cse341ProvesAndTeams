const http = require("https");
const express = require('express');
const router = express.Router();
var stuff = null;
const test = {
    myTest: null
}

function processJson() {
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

    http.get(url, (response) => {
        var body = '';

        response.on('data', (chunk) => {
            body += chunk;
        })

        response.on('end', () => {
            var jsonResponse = JSON.parse(body);

            test.myTest = jsonResponse;

            //res.render('results', stuff);
        });
    }).on('error', (e) => {
        console.log("Error ", e);
    });
}

var data = processJson();

router.get('/',(req, res, next) => {
    res.render('pages/ta03', { 
        title: 'Team Activity 03', 
        path: '/ta03', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true,
        data: test.myTest
    });
});


module.exports = router;
exports.jsonResponse = { processJson: processJson };