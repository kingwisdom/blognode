const express = require("express")
const app = express()
const dotenv= require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");
const multer = require("multer");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

dotenv.config();
app.use(express.json());

mongoose.connect(
    process.env.MONGO_URL,
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload =multer({storage:storage});
app.post("api/upload", upload.single("file"), (req,res)=> {
    res.status(200).json("file has been successfully uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postRoute)
app.use("/api/categories", catRoute)

const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`runing on port ${port}`);
})