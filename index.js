require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {Server} = require('socket.io')
const http = require('http');
const connection = require('./db/connection');
const app = express();
const server = http.createServer(app);
const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute');
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'));
const io = new Server(server)
global.io = io
app.use(userRoute)
app.use(chatRoute)
const PORT = process.env.PORT || 4000
server.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})


// db connect
connection()

// error handler
app.use((err,req,res,next)=>{
  console.log(err);
})


