import dotenv from 'dotenv';

dotenv.config();

interface Config{
    PORT: number,
    PAYSTACK_SECRET_KEY: string,
    PAYSTACK_BASE_URL: string,
}

const config: Config = {
    PORT: parseInt(process.env.PORT || '3000'),
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || '',
    PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',
}

export default config;