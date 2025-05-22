import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Servernm,l is running on port ${PORT}`);
});
