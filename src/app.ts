import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import v1routes from './routes/v1/index'

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rate Limiting 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many request sent in 15 minutes. Please try again after 15 minutes."
})

app.use(limiter);

// Routes
app.use('/api/v1', v1routes)


// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Not found"
    })
});



// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
    next();
})

export default app;