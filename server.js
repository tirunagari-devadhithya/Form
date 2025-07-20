const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const port = 3456;

const app= express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost:27017/form').then(()=>console.log('MongoDB Connected'));

const userSchema = new mongoose.Schema({
    name:String,
    password:Number,
});

const users= mongoose.model("fillers", userSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit',async (req,res)=>{
    const { name, password } = req.body;

    const user = new users({
        name,password
    });

    await user.save().then(()=>console.log('Data saved successfully'));
    res.send("form submitted");

});

app.listen(port,()=> console.log(`Server is running on http://localhost:${port}`));