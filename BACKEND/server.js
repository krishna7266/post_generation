const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

dns.setDefaultResultOrder('ipv4first');

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
