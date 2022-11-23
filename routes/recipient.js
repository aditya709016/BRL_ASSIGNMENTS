const express = require('express')
const router = express.Router()
const recipients = require('../models/recipients')
const querystring = require('querystring')


// <---gives subscription_status--->
router.get('/recipients', async(req,res) => {
    try{
           const recipients = await recipients.findone(req.query.subscription_status)
           res.json(recipients)
    }catch(err){
        res.send('Error ' + err)
    }
})
// <----new recipient---->
router.post("/recipients",async (req, res) => {
    try{
        const user = new recipients(req.body);
        const adduser=await user.save();
        res.status(201).send(adduser);
    }catch(e){
        res.status(400).send(e);
    }
  });

    
// <-----delete all recipients------>
router.delete('/recipients', async(req,res) => {
    try{
           const recipient = await recipients.deleteMany()
           res.json(recipient)
    }catch(err){
        res.send('Error ' + err)
    }
})

// <-------find a recipient by its email----->
router.get('/recipients', async(req,res) => {
    try{
           const recipients = await recipients.findbyemail(req.query.email)
           res.json(recipients)
    }catch(err){
        res.send('Error ' + err)
    }
})




router.patch("/recipients",async(req,res)=>{
    try {
        const newemail=req.params.email;
        console.log(newemail);
        const updateRecipients=await recipients.findOneAndUpdate({email:newemail},req.body,{
            new:true
        });
        console.log(updateRecipients);
        res.send(updateRecipients);
        
    } catch (e) {
        
        res.status(400).send(e);
    }

});

// <------delet a perticular recipient------>
router.delete('/recipients', async(req,res) => {
    try{
           const recipients = await recipients.deletOne(req.query.email)
           res.json(recipients)
    }catch(err){
        res.send('Error ' + err)
    }
})



// <-------change the subscription_status of a perticular recipient to true----> 
router.get('/recipient',async(req,res)=> {
    try{
        const recipients = await recipients.findByemail(req.query.email) 
        recipients.Subscription_status = true
        const a1 = await recipients.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
// <-------change the subscription_status of a perticular recipient to false------>
router.get('/recipient',async(req,res)=> {
    try{
        const recipients = await recipients.findByemail(req.query.email) 
        recipients.unsubscription_status = false
        const a1 = await recipients.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

module.exports = router
