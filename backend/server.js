const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv');
const connectDb = require('./config/db');
const authRoutes=require('./routes/authRoutes');
const categoryRoutes=require('./routes/categoryRoutes');

dotenv.config();

const app=express();
app.use(express.json())
app.use(cors())

const PORT=process.env.PORT || 4000;
connectDb();

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/api/auth",authRoutes);
app.use("/api/categories",categoryRoutes);


app.listen(PORT,()=>{
    console.log(`Sever is running at ${PORT}`)
})