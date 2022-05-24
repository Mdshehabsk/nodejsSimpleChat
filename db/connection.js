const mongoose = require('mongoose');


const connection = async () =>{
    try{
        const db = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected: ${db.connection.host}`);
    }catch(err){
        console.log(err)
    }
}


module.exports = connection;