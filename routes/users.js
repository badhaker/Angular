var express = require('express');
var router = express.Router();
var Signup = require('../models/signup');///////////////////
const { request } = require('../app');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
///////////////////////////// for adding data /////////////////////////
router.post('/add', (req,res)=>{
  try{
   new Signup({name:req.body.name,email:req.body.email,textarea:req.body.textarea}).save((err, data)=>{
     if(err)
     throw(err)
     else{
       res.json({message: "Your data has been saved", success : true})
     }
   })
  }
  catch (err){
    console.log(err)
    res.json(err)
  }
})

///////////////////////////for update data//////////////////////
router.post('/update/:id',function(req,res,){
  var query = {"_id": req.params.id};
  var update = {fname: req.body.fname,lname:req.body.lname,email:req.body.email,number:req.body.number,password:req.body.password};
  var options = {new:true};
  Signup.findOneAndUpdate(query,update,options, function(err,signup){
    console.log(signup)
    res.json({ "value": "your data has been updated"})
  })
});

//////////////////////// for delete data//////////////////////////
router.post('/delete/:id',function(req,res,){
  var data = {"_id":req.params.id};
  Signup.findByIdAndRemove(data, function(err,signup){
    console.log(signup)
    res.json({ "value": "your data has been deleted"})
  })
});

////////////////////////////////// for read data /////////////////////////////////
router.get('/read',function(req,res,){
  Signup.find(function(err,signup){
    console.log(signup)
    res.json({signup : signup})
  })
});
module.exports = router;
