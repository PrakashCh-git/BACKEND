const mongoose = require('mongoose');

function connecttoDB() {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected Successfully");
    })
    .catch((err)=>{
        console.error(err);
    })
}

module.exports = connecttoDB;
