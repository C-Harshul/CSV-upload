const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/authentication')

router.post('/new',async (req,res) =>{
    const user = new User(req.body)
    try{
        const token = await user.generateAuthtoken()
        await user.save()
        res.send({user,token})
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }

})

router.post('/login', async(req,res) =>{
    try {
        const loginCreds = req.body
        console.log(loginCreds)

        const user = await User.findCredentials(loginCreds.name,loginCreds.password)
        
        if(!user){
          return res.status(404).send({error : "Authentication failed"})
         }
       const token = await user.generateAuthtoken()
       res.send({user,token})
    
    } catch(e) {
        console.log(e)
       res.status(400).send()  
    }
})

//Logout user from all devices
router.get("/logout", auth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      console.log(e)  
      res.status(500).send();
    }
  });

module.exports = router