const express = require("express");
const app = express();
const dbConnect = require("./DB/dbConnect")
const router = require("./Routes/AuthRoutes")
const cors = require("cors")
const PORT = 8080;
const cookieParser = require("cookie-parser")

const corsOption = {
    origin: "http://localhost:4200",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials : true
}

app.use("*",cors(corsOption))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use("/api/user/",router) 




app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})

dbConnect()