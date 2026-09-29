const dns = require('dns');

// Use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Prefer IPv4
dns.setDefaultResultOrder('ipv4first');
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();
app.listen(3001, ()=>{
    console.log("server is running on port 3001");
})