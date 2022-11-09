const express = require('express')
const router = express.Router()
const recipients = require('../models/recipients')
const querystring = require('querystring')


// <---gives subscription_status--->
router.get('/recipients', async(req,res) => {
    try{
           const recipients = await recipients.fine(req.query.subscription_status)
           res.json(recipients)
    }catch(err){
        res.send('Error ' + err)
    }
})
// <----new recipient---->
router.post('/recipients', async(req,res) => {
    const recipients = new Recipients({
        name: req.body.name,
        email: req.body.email,
        subscription_status: req.body.sub
    })

    try{
        const a1 =  await recipients.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
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
           const recipients = await Recipients.findbyemail(req.query.email)
           res.json(recipients)
    }catch(err){
        res.send('Error ' + err)
    }
})




router.patch('/recipients',async(req,res)=> {
    try{
        const recipients = await Recipients.findbyemail(req.query.email) 
        recipients.email = req.body.email
        const a1 = await recipients.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
// <------delet a perticular recipient------>
router.delete('/recipients', async(req,res) => {
    try{
           const recipients = await Recipients.deletOne(req.query.email)
           res.json(recipients)
    }catch(err){
        res.send('Error ' + err)
    }
})


// <-------change the subscription_status of a perticular recipient to true----> 
router.get('/recipients',async(req,res)=> {
    try{
        const recipients = await Recipients.findByemail(req.query.email) 
        recipients.subscription_status = true
        const a1 = await recipients.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})
// <-------change the subscription_status of a perticular recipient to false------>
router.get('/recipients',async(req,res)=> {
    try{
        const recipients = await Recipients.findByemail(req.query.email) 
        recipients.unsubscription_status = false
        const a1 = await recipients.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

module.exports = router
