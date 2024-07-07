require('./initalizer')
require('./mongoose/init')

const http = require('http')
const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require('express-fileupload')
import chalk from "chalk";
const path = require("path");
const MongoStore = require("connect-mongo");
const PORT = process.env.port


const server = http.createServer(app)

app.use(require("cors")());
app.set("view engine", require("ejs"));
app.use(
  session({
    secret: process.env.session,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.atlas,
    }),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 6/24/2024 8:49AM | Should i keep it? Comment out for now

// app.use(fileUpload({
//  useTempFiles : true,
//  tempFileDir : './files/tmp/',
//  limits: { fileSize: 50 * 1024 * 1024 }
// }));

app.use("/api", require("./routers/api"));
app.use("", require("./routers/index")); // this is for / Route BTW
app.use('/dashboard', require('./routers/dashboard'))
app.use('/teachers', require('./routers/teachers'))
app.use('/students', require('./routers/students'))
app.use('/class', require('./routers/class'))
app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("/files", express.static(path.join(__dirname, "files"))); COMMENT HER OUTT
app.use("/node_modules", express.static(path.join(__dirname, "node_modules"))); // Major security ISSUE

app.use((req, res, next) => {
  res.status(404).render(__dirname + "/views/errors/404.ejs", {
    title: process.env.title,
  });
}); // 404 Duck not found

server.listen(PORT, () => {
  console.log(chalk.blue("[EXPRESS]") + chalk.green(" Running on port:", PORT));
});
ssh.start();