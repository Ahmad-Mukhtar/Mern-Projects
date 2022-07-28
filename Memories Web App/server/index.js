import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import PostRoutes from './routes/posts.js'



const app=express();

app.use('/posts',PostRoutes)
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

const CONNECTION_URL="mongodb+srv://java:java123@cluster0.rjypt3i.mongodb.net/?retryWrites=true&w=majority"

const PORT=process.env.PORT||5000

mongoose.connect(CONNECTION_URL).
then(()=>app.listen(PORT,()=>console.log(`Server Running on Port: ${PORT}`)))
.catch((error)=>console.log(error.message)
)
