const express = require('express');
const { model } = require('mongoose');
const noteModel = require('./models/notemodel');
const cors = require('cors');

const App = express();

App.use(express.json());
App.use(cors());


App.post("/api/notes", async (req,res)=>{
    const {title,description} = req.body;

    const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully",
        note
    })
})


App.get("/api/notes", async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        notes
    })
})

App.delete("/api/notes/:id", async (req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Data deleted successfully"
    })
})

App.patch("/api/notes/:id", async (req,res)=>{
    const {description} = req.body;

    await noteModel.findByIdAndUpdate(req.params.id,description);

    res.status(200).json({
        message: "Data has been updated successfully"
    })
})





module.exports = App;


