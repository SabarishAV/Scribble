const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database`);
    }
    catch(error){
        console.error(error)
    }
}

module.exports = connectDB