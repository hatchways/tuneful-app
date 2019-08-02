const express = require('express');
const GetCookiesRouter = express.Router();


GetCookiesRouter.get('/',function(req,res){
    console.log('Cookies:',req.cookies)

})