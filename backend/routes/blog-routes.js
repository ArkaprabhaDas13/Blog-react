import  express  from "express";
import {getAllBlogs,addBlog,updateBlog,getById,deleteBlog} from "../controllers/blog-controller"
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);    //showing all blogs
blogRouter.post("/add",addBlog);    //adding blogs
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
export default blogRouter;
