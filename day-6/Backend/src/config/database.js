const mongoose = require('mongoose');

async function connecttoDB() {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected Successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}


module.exports = connecttoDB;