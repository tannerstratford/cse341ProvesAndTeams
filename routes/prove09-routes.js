const http = require("https");
const express = require('express');
const { url } = require("inspector");
const router = express.Router();
var stuff = null;
const test = {
    myTest: null
}
var offset = 10;
var limit = 10;   
   
router.get('/:' + offset,(req, res, next) => {
    offset = req.url.split('/')[1];
    if(offset[offset.length - 1] == '?'){
        
        offset = offset.split('?')[0]
    }

    var myUrl = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit;
    console.log(myUrl);

    http.get(myUrl, (response) => {
        var body = '';

        response.on('data', (chunk) => {
            body += chunk;
        })

        response.on('end', () => {
            var jsonResponse = JSON.parse(body);

            jsonResponse;

            res.render('pages/prove09', { 
                title: 'Prove Assignment 09', 
                path: '/ta09', // For pug, EJS 
                offset: offset,
                data: jsonResponse
            });
        });
    }).on('error', (e) => {
        console.log("Error ", e);
    });
    
});


module.exports = router;
//exports.jsonResponse = { processJson: processJson };
