const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const userRoute=require("./routes/user")
const blogRoute=require("./routes/blog");
const mongoose=require("mongoose");
const Blog=require('./models/blog');
const { checkFOrAuthenticationCookie } = require("./middlewares/authentication");
const app=express();
const port=3000;
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(checkFOrAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
mongoose.connect('mongodb://localhost:27017/blogify').then(e=>console.log(`MongoDb connnected`));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
});


app.use("/user",userRoute);
app.use("/blog",blogRoute);




app.listen(port,()=>console.log(`Server running on port ${port}`));