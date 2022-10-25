import express from "express";
import mongoose from 'mongoose';
const app = express();

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.1qs3ufc.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=>app.listen(5000))
.then(()=>console.log("Connected to Database and listening to PORT 5000"))
.catch((err)=>console.log(err));

// app.use("/api", (req, res, next) =>{
//     res.send("hello world");
// });

// app.listen(5000);