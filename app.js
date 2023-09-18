require("dotenv").config();
require("express-async-errors")
//EXPRESS
const express = require("express");
const app = express();

// rest of the packages
const morgan = require('morgan');
const cookieParser = require("cookie-parser");

//DATABASE
const connectDB = require("./db/connect")

//ROUTES
const authRouter = require('./routes/authRoutes');
const userRouter = require("./routes/userRoutes");

// MIDDLEWARE
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//EXPRESS MIDDLEWARE
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

//BASIC ROUTE
app.get('/',(req,res)=>{
 
    res.send("E-COMMERCE-API")
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server on the port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
