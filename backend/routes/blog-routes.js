import  express  from "express";
import {getAllBlogs,addBlog,updateBlog} from "../controllers/blog-controller"
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);    //showing all blogs
blogRouter.post("/add",addBlog);    //adding blogs
blogRouter.put("/update/:id", updateBlog);

export default blogRouter;
