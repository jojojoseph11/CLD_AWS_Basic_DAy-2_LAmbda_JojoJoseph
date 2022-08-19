const app = require("express")();
const routes = require("./src/routes/userRoute");
require('dotenv').config();


app.use('/', routes);


app.listen( PORT, HOSTNAME, (error) => {
    if (error) {
        console.log("Server Error")
    }
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
})