const express = require('express');
const router = express.Router();
const fs = require('fs')
function ioUpdate(){ require('../index').ioUpdate}
function emitUpdate(){require('../index').emitUpdate}


// Path to your JSON file, although it can be hardcoded in dummy file.
var dummyData = require('../data/prove11-data.json')

// for(var i = 0; i < dummyData.avengers.length; i++){
//     dummyData.avengers[i] = {name: dummyData.avengers[i].name, attributeName: [], attributeValue: []}
// }

ioUpdate()

function saveData(dummyData) {
    console.log("saveData Called")
    fs.writeFileSync('C:\\git\\cse341\\Project\\cse341-project-master\\cse341-project-master\\data\\prove11-data.json', JSON.stringify(dummyData), err => {
        console.log("dummy error", err)
    })
    console.log("saveData executed")
}

router.get('/', (req, res, next) => { 
    res.render('pages/prove11', {
        title: 'Team Activity 11',
        path: '/teamActivities/11',
        data: dummyData
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
    for(var i = 0; i < dummyData.avengers.length; i++){
        if(req.body.avenger == dummyData.avengers[i].name){
            same = true
        }
    }
    if(same == false){
        dummyData.avengers[dummyData.avengers.length] = {name: req.body.avenger, attributeName: [], attributeValue: []}
        same = false
    }
    saveData(dummyData)
    emitUpdate()
    ioUpdate()
    res.redirect('/prove11')
});

router.post('/insertAttribute', (req, res, next) => {
    /************************************************
     * INSERT YOUR WEB ENDPOINT CODE HERE
    ************************************************/
       
       if(req.body.attributeName){
        dummyData.avengers[req.body.iteration].attributeName.push(req.body.attributeName)
    }
        if(req.body.attributeValue){
            dummyData.avengers[req.body.iteration].attributeValue.push(req.body.attributeValue)
        }
        console.log("dummyData routes", dummyData.avengers)
        saveData(dummyData)
        emitUpdate()
        ioUpdate()
        res.redirect('/prove11')
    });

module.exports = router;