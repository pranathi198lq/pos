const express= require("express");
const app= express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const helmet= require("helmet");
const morgan= require("morgan");
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");
const postRoute= require("./routes/posts");
const cors = require('cors');

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{
    console.log("Connected to MongoDB")
});

//middleware:
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8000, ()=>{
    console.log("Backend server is running!")
})
