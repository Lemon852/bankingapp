if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");

//connection for database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.log("Connected To database"));






//middlewares
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "layouts/layout");

//routes
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

//server config
app.listen(3000, () => console.log("Listening"));
