
const mongoose = require ("mongoose")

const dbConnect = async()=>{
    await mongoose.connect("mongodb+srv://akshupokalekar98:FTUMBHt4iMrlXFjg@fleet.obrgp.mongodb.net/?retryWrites=true&w=majority&appName=Fleet")
    .then((res)=>console.log("Database Connected Successfully"))
    .catch((err)=>console.log(err))
    
        
}

module.exports = dbConnect