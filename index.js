const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const morgan = require("morgan");
const app = express();
const routes = require('./routes/index');
require("dotenv").config();
const fileUpload = require("express-fileupload");
const PORT = 3004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan("combined"));
app.use(routes);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_MongoURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server has been started on port: ${process.env.PORT}  `);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
