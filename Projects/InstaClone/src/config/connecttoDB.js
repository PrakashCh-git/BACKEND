const mongoose = require("mongoose");


async function connecttoDB() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}


module.exports = connecttoDB;