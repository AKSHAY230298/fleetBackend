const express = require("express");
const { register, login } = require("../Controllers/AuthController");


const router = express.Router()


router.post("/register",register)



router.post("/login",login)


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