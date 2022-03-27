const router = require("./routes/router");
const config = require("./config/default.json");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port =
    process.env.PORT == null || process.env.PORT == ""
        ? 8000
        : process.env.PORT;

bodyParser.urlencoded({
    extended: false,
});

app.use(cors({ origin: config.client, optionsSuccessStatus: 204 }));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
