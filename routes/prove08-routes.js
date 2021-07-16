const http = require("https");
const express = require('express');
const { url } = require("inspector");
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



var itemCount = 0;
router.get('/:' + itemCount,(req, res, next) => {
    itemCount = req.url.split('/')[1];
    if(itemCount[itemCount.length - 1] == '?'){
        console.log('length', itemCount[itemCount.length - 1])
        itemCount = itemCount.split('?')[0]
    }
    console.log("item count: ", itemCount);
    res.render('pages/prove08', { 
        title: 'Prove Assignment 08', 
        path: '/ta08', // For pug, EJS 
        itemCount: itemCount,
        data: test.myTest
    });
});


module.exports = router;
exports.jsonResponse = { processJson: processJson };
