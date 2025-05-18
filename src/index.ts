import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import {jwt_password} from "./config"
import { userMiddleware } from "./middleware";


const app = express();
app.use(express.json())
mongoose.connect("mongodb+srv://zeeero412:47PKyoRmP4CfKiso@cluster0.pq0gecu.mongodb.net/user")
app.post("/api/v1/signup" , async(req,res) =>{
const username = req.body.username
const password = req.body.password

try {
await UserModel.create({
    username: username ,
    password : password 
})
res.json ({
    message: "User Signed UP"
})
}
catch(e)
{
    res.status(411).json({
        message: " duplicate alert"
    })
}


})

app.post("/api/v1/signin" , async(req,res) =>{
const username = req.body.username ;
const password = req.body.password ;
const existingUser = await UserModel.findOne({
    username,password
}) 
if (existingUser){
    const token = jwt.sign({
        id:existingUser._id },jwt_password)
    res.json({
        token
    })
}
else{
    res.status(403).json({
        message:" incorrect cred"
})

} 


})

app.post("/api/v1/content" ,userMiddleware,async (req,res) =>{
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
    
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags:[]
    })
     res.json({
        message: "content created" })
    

    
    })
    

app.get("/api/v1/contents" ,userMiddleware, async(req,res) =>{
    //@ts-ignore
    const userId = req.userId
    const content = await ContentModel.find ({
        userId:userId
    }).populate("userId","username")
    
    res.json({
        content
    })

}

)

app.delete("/api/v1/contents" , (req,res) =>{

})

app.post("/api/v1/brain/share" , (req,res) =>{

})


app.post("/api/v1/brain/:shareLink" , (req,res) =>{

})

app.listen(3000);