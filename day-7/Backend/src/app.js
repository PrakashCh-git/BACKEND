const express = require('express');
const noteModel = require('./models/note-model');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.post('/api/note',async (req,res)=>{
    const {title,description} = req.body;

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message : "Note added successfully",
        note

    })
})

app.get('/api/note',async (req,res)=>{
    const note = await noteModel.find();

    res.status(200).json({
        note
    })
})

app.patch('/api/note/:id', async (req,res)=>{
    const {description} = req.body;

    await noteModel.findByIdAndUpdate(req.params.id, {
        description: description
    });

    res.status(200).json({
        message:"Updated Successfully"
    })

})

app.delete('/api/note/:id',async (req,res)=>{
    await noteModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message:"Note deleted successfully"
    })
})


module.exports = app;