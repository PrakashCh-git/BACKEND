const mongoose = require('mongoose');

const connecttoDB = async () => {
    await mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("Connected to database successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}


module.exports = connecttoDB;