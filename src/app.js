import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv';
import userRoutes from './routes/user.route.js';
import { connectDB } from './utils/connectDB.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Listening on PORT ${PORT}`);
    await connectDB();
})