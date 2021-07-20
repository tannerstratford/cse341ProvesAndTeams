const express = require('express');
const router = express.Router();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = {
    "avengers": [
        {
            "name": "Tony Stark"
        },
        {
            "name": "Steve Rogers"
        },
        {
            "name": "Thor Odinson"
        },
        {
            "name": "Bruce Banner"
        },
        {
            "name": "Natasha Romanova"
        },
        {
            "name": "Clint Barton"
        }
    ]
}

var thisData = dummyData;

for(var i = 0; i < thisData.avengers.length; i++)
        thisData.avengers[i] = {name: thisData.avengers[i].name, attributeName: [], attributeValue: []}

router.get('/', (req, res, next) => { 
    res.render('pages/prove10', {
        title: 'Team Activity 10',
        path: '/teamActivities/10',
        data: thisData
    });
});

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData);
});

router.post('/insert', (req, res, next) => {
/************************************************
 * INSERT YOUR WEB ENDPOINT CODE HERE
************************************************/
    var same = false;
    for(var i = 0; i < thisData.avengers.length; i++){
        if(req.body.avenger == thisData.avengers[i].name){
            same = true
        }
    }
    if(same == false){
        thisData.avengers[thisData.avengers.length] = {name: req.body.avenger, attributeName: [], attributeValue: []}
        same = false
    }
    res.redirect('/prove10')
});

router.post('/insertAttribute', (req, res, next) => {
    /************************************************
     * INSERT YOUR WEB ENDPOINT CODE HERE
    ************************************************/
       console.log(thisData)
       console.log("attributeValue", req.body.attributeValue)
       console.log("iteration", req.body.iteration)
       if(req.body.attributeName){
        thisData.avengers[req.body.iteration].attributeName.push(req.body.attributeName)
    }
        if(req.body.attributeValue){
            thisData.avengers[req.body.iteration].attributeValue.push(req.body.attributeValue)
        }
        console.log("ThisData routes", thisData.avengers)
    
        res.redirect('/prove10')
    });

module.exports = router;