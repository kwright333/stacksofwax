let express = require('express');
let app = express();
const PORT = 3000;

const path = require("path");
app.use(express.json());
app.use(express.static("static"));

