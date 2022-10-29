import  express  from "express";
import {getAllBlogs,addBlog} from "../controllers/blog-controller"
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);    //showing all blogs
blogRouter.post("/add",addBlog);    //adding blogs
export default blogRouter;
