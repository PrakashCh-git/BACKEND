require('dotenv').config()
const App = require("./src/app");
const connecttoDB = require("./src/config/database");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


connecttoDB();




App.listen(3000,()=>{
    console.log("Server is listening at http://localhost:3000");
})