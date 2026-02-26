require("dotenv").config();
const app = require('./src/app');
const connecttoDB = require('./src/config/database');

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


connecttoDB();
app.listen(3000,()=>{
    console.log("Server is listening at port at http://localhost:3000");
})