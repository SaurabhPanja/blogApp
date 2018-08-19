var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/blogApp");

app.use("view engine","ejs");
app.set(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function (req,res) {
  res.send("Hello");
});

app.get("*",function (req,res) {
  res.send("Error 404");
});

app.listen(8080,function () {
  console.log("Server running on port 8080");
});
