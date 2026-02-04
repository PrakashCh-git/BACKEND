const express = require("express");

const app = express();

app.use(express.json());


const nodes = [];


app.post("/nodes",(req,res)=>{
    nodes.push(req.body);
    res.send("Node has been added");
})

app.delete("/nodes/:index",(req,res)=>{
    const idx = Number(req.params.index);

    if(idx<0 || idx>=nodes.length) {
        res.send("Invalid index");
    }
    else {
        nodes.splice(idx,1);
        res.send("Node deleted successfully");
    }

})

app.get("/nodes",(req,res)=> {
    if(nodes.length==0) {
        res.send("Node list is empty");
    }
    else {
        res.send(nodes);
    }
})

app.patch("/nodes/:index",(req,res)=> {
    const idx = Number(req.params.index);
    if(idx >= nodes.length) {
        res.send("Index Out of Bound");
    }
    else {
        nodes[req.params.index].description = req.body.description;
        res.send("Modification done successfully");
    }
})

app.listen(3000,()=> {
    console.log("Server is listening on port 3000");
})

