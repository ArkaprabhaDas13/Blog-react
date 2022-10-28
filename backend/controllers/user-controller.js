import User from "../model/User";


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
    let {name,email,password} = req.body;
    let exUser;
    try{
        exUser = await User.findOne({email});
    }
    catch(err){

       return console.log(err);
    } 
    if(exUser)
    {
        return exUser.status(400).json({message:"User already exists!! Please Login or fuck offff"});
    }
    let user = new User({
        name,
        email,
        password    
    })
    try{
        user.save();

    }
    catch(err){
        return console.log(err);
    }
    return res.status(201).json({user});
}
// export getAllUser;
