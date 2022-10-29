import User from "../model/User";
import bcrypt from 'bcryptjs';

 export const  getAllUser = async(req, res, next) => {

    let users;
    
    try{
        users = await User.find();
    } catch(err) {
        console.log(err);
    }

    if(!users)
    {
        return res.status(404).json("No Users found");
    }

    return res.status(200).json({users});

};
export const  signup =async(req,res,next)=>{
    let {name,email,password} = req.body;           // Gets the data from frontend
    let exUser;
    try{
        exUser = await User.findOne({email});       // find whether the email exists in the Mongo DB
    }
    catch(err){

       return console.log(err);
    } 
    if(exUser)
    {
        return res.status(400).json({message:"User already exists!! Please Login."});
    }

    let hashPassword = bcrypt.hashSync(password);

    let user = new User({
        name,
        email,                  // If the user doesnot exist , create a new schema 
        password:hashPassword
    })

    
    try{
        user.save();        // save in mongo db
    }
    catch(err){
        return console.log(err);
    }
    return res.status(201).json({user});
}

export const login = async(req, res, next)=>{
    const {email, password} = req.body;

    let exUser;
    try{
        exUser = await User.findOne({email});       // find whether the email exists in the Mongo DB
    }
    catch(err){

       return console.log(err);
    } 
    if(!exUser)
    {
        return res.status(404).json({message:"Couldn't find user"});
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, exUser.password);

    if(!isPasswordCorrect)
    {
        return res.status(400).json({message:"Incorrect Password"});
    }

    return res.status(200).json({message:"Successful Login"});
    
}


// export getAllUser;
