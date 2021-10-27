const express=require('express');
const app=express();
const path=require('path');

app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
  res.render("index");
});
app.get("/signup",function(req,res){
  res.render("signup");
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/adminLogin",function(req,res){
  res.render("adminLogin");
});
app.get("/adminDashboard",function(req,res){
  res.render("adminDashboard");
});

app.get("/",function(req,res){
  res.render("index");
});
app.get("/courseRegisterform",function(req,res){
  res.render("courseRegisterform");
});

app.listen(8000,function(){
  console.log("Server is listening on port 8000");
});
