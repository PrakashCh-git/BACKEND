const express = require("express");

const app = express();

app.use(express.json());

const nodes = [];

app.post('/notes',(req,res)=>{
    nodes.push(req.body);
    res.send("node created");
})

app.get("/notes",(req,res)=>{
    if(nodes.length) {
        res.send(nodes);
    }
    else {
        res.send("No node available");
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})