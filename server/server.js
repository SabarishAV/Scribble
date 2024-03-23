const express = require("express");
const cors = require('cors'); 
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const connectDB = require("./config/dbConnection")

dotenv.config()
connectDB()

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
app.use(cookieParser()); 
app.use(express.json());
app.use("/users",require("./routes/userRoutes"))
app.use("/blog",require("./routes/blogRoutes"))

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});