import express from "express";
import mongoose from 'mongoose';
import router from "./routes/user-routes";
const app = express();

app.use("/api/user", router);

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.1qs3ufc.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=>app.listen(5000))
.then(()=>console.log("Connected to Database and listening to PORT 5000"))
.catch((err)=>console.log(err));
