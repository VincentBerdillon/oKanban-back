require("dotenv").config();
const express = require("express");
const multer = require('multer');
const router = require("./app/index.router");
const cors = require("cors");
const bodySanitizer = require("./app/middelwares/body.sanitizer");

const multipartParser = multer();
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(multipartParser.none());

app.use(cors('*'));
app.use(bodySanitizer);
app.use(router);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Listening at port:${port}`);
});