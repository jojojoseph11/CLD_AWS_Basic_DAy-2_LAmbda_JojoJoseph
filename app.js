const express = require("express");
const app = express();
require('dotenv').config({ path : "./vars/.env"});
const routes = require("./src/routes/userRoute");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

app.use('/', routes);
app.listen(PORT, HOSTNAME, (error) => {
    if (error) {
        console.log("Server Error")
    }
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});