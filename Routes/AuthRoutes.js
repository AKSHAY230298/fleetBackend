const express = require("express");
const { register } = require("../Controllers/AuthController");


const router = express.Router()


router.post("/register",register)



// router.post("/login",auth.login)


router.get("/check",(req,res)=>{
   try {
    res.json({
        message:"Working"
    })
   } catch (error) {
    console.log(error);
    
   }
})
module.exports = router