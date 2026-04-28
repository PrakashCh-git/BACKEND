require("dotenv").config();
const app = require("./app");
const connecttoDB = require("./src/config/connecttoDB");



const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

connecttoDB();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`)
})
