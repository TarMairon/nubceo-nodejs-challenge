const { Router } = require('express');
const router = Router();

//LOAD CONTROLLER
var auth = require("../helpers/auth");

//GET
router.get('/' , (req , res)=>{
    res.send('Hi! This is responding to the Nubceo Node.js challenge! :)')
 })

 //POST
 router.post('/refresh-token', auth.refreshAuthentication, auth.generateNewToken);
 
module.exports = router;