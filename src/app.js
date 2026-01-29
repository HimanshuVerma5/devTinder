const express=require("express");

const app=express();

app.get("/user",(req,res)=>{
  res.send({ firstName:"Himanshu",lastName :"Verma" });
});
app.post("/user",(req,res)=>{
  res.send("Data Is In DataBase");
});
app.delete("/user",(req,res)=>{
  res.send("Deleted Succesfully");
});

app.use("/test",(req,res)=>{
 res.send("Hello from server...");
});



app.listen(7777,()=>{
    console.log("Server is succesfully runs");
});