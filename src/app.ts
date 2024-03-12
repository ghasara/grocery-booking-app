import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
