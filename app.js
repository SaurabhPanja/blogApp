var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose       = require("mongoose");

//mongoose.connect("mongodb://localhost/blogApp",{ useNewUrlParser: true });
mongoose.connect("mongodb://Admin:saurabh1@ds229722.mlab.com:29722/mycamp",{ useNewUrlParser: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//Database Schema

var blogSchema = new mongoose.Schema({
  title : String,
  image : String,
  description : String,
  created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("blog",blogSchema);

//Restful routes

app.get("/",function (req,res) {
  res.redirect("/blogs");
});

//index route
app.get("/blogs",function (req,res) {
  Blog.find({},function (err,data) {
    if (err) {
      console.log(err);
    }else {
      res.render("index",{blogs:data});
    }
  });
});

//show
app.get("/blogs/show/:id",function (req,res) {
  Blog.findById(req.params.id,function (err,data) {
    if (err) {
      console.log(err);
    }else {
      res.render("show",{blog:data});
    }
  });
});
//new
app.get("/blogs/new",function (req,res) {
  res.render("new");
});
//create route
app.post("/blogs",function (req,res) {
  req.body.description = req.sanitize(req.body.description);
  Blog.create({
    title : req.body.title,
    description : req.body.description,
    image: req.body.image
  },function (err,data) {
    if (err) {
      console.log(err);
    }else {
      res.redirect("/");
      console.log(data);
    }
  });
});
//update route
app.put("/blogs/:id",function (req,res) {
  req.body.description = req.sanitize(req.body.description);
  Blog.findByIdAndUpdate(req.params.id,req.body,function (err,data) {
    if (err) {
      console.log(err);
    }else {
      res.redirect("/blogs/show/"+req.params.id);
      console.log(data);
    }
  });
});
//delete route
app.delete("/blogs/:id",function (req,res) {
  Blog.findByIdAndRemove(req.params.id,function (err) {
      if (err) {
        console.log(err);
      }else {
        res.redirect("/");
      }
  });
});
//edit route
app.get("/blogs/:id/edit",function (req,res) {
  Blog.findById(req.params.id,function (err,data) {
    if (err) {
      console.log(err);
    }else {
      res.render("edit",{blog:data});
    }
  });
});
//else if
app.get("*",function (req,res) {
  res.send("Error 404");
});

app.listen(process.env.PORT,process.env.IP,function () {
  //console.log("Server running on port 8080");
});
