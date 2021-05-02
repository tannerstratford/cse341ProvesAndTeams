//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();
var removalError = false;
var duplicateError = false;

const array = ['Tanner', 'Sophia', 'Nathan'];

router.post('/addUser', (req, res, next) => {
    const newUser = req.body.newUser;
    removalError = false;

    const index = array.indexOf(newUser);
    if(index !== -1){
        duplicateError = true;
    }
    else{
        duplicateError = false;
        array.push(newUser);
    }

    res.redirect('/ta02/');
});

router.post('/removeUser', (req, res, next) => {
    const removeUser = req.body.removeUser;
    removalError = false;
    duplicateError = false;

    const index = array.indexOf(removeUser);
    if(index !== -1){
        array.splice(index, 1);
    }
    else{
        removalError = true;
    }

    res.redirect('/ta02/');
})

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS 
        activeTA03: true, // For HBS
        contentCSS: true,
        users: array,
        removalError: removalError,
        duplicateError: duplicateError
    });
});

module.exports = router;