import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";


export const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find();    
    }
    catch(err){
        return console.log(err);
    }
    if(!blogs)
        return res.status(404).json({message:"Blog Not Found!!"});
    return res.status(200).json({blogs});
}

export const addBlog = async (req,res,next)=>{
    const {title,description,image,user} = req.body;

    let exUser;
    try{
        exUser= await User.findById(user);

    }
    catch(e)
    {
        return console.log(e);
    }
    if(!exUser)
    {
        return res.status(500).json({message:"Unable to find user by id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })

    try{
        await blog.save();
    }
    catch(err)
    {
        return console.log(err);
    }
    

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exUser.blogs.push(blog);
        await exUser.save({session});
        await session.commitTransaction();
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({message: e});
    }
    
    return res.status(200).json({blog})


    
}

export const updateBlog = async (req,res,next)=>{

    const {title, description} = req.body;
    
    const blogId = req.params.id;

    let blog;

    try{
        blog = await Blog.findByIdAndUpdate(blogId, 
            {
                title,
                description
            })
    }
    catch(err)
    {
        return console.log(err);
    }

    if(!blog)
    {
        return res.status(500).json({message:"Unable to update the blog!"});
    }

    return res.status(200).json({message:"Successfully updated the blog"});

};

export const getById = async (req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    }
    catch(e)
    {
        return console.log(e);
    }
    if(!blog)
        return res.status(404).json({message:"Blog not found!"});
    return res.status(200).json({blog});
}
export const deleteBlog = async(req,res,next)=>{
    const id = req.params.id;
    let blog ;
    try{
        blog = await Blog.findByIdAndRemove(id);
    }
    catch(e){
    return console.log(e);
    }
    if(!blog)
        return res.status(500).json({message:"unable to delete"});

    return res.status(200).json({message:"Successfully deleted"});

}