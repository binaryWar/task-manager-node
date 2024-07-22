const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT ||  3000;
const appRouter = require("./routes/app.routes");
const errorHandler = require("./middleware/errorHandler.middleware.controller");
require("./models/db");

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use(appRouter);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.use(errorHandler);

app.listen(port,()=>{
    console.log("app listening on the port ",port );
})
