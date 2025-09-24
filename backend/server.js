import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares setup
app.use(express.json());
app.use(cors(({ origin: '*', credentials: true })));


// Database connection
const mongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connection is successfull');
    } catch (err) {
     console.error(err);
     res.status(400).json({msg:'Database connection error'})   ;
     process.exit(1);
    }
}

//routes
app.use('/api/projects', projectRoutes);
app.use('/api' ,taskRoutes);
app.use('/api/auth' ,authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Routes setup
app.get('/',(req,res)=>{
    res.status(200)
    res.send(`Api is running`)
});

mongoDB();

// Start server
app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
});






