import dotenv from 'dotenv';

dotenv.config();

interface Config{
    PORT: number,
    PAYSTACK_SECRET_KEY: string,
    PAYSTACK_BASE_URL: string,
    NODE_ENV: 'development' | 'production';
  IS_PRODUCTION: boolean; // Helper flag
}

const config: Config = {
    PORT: parseInt(process.env.PORT || '3000'),
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || '',
    PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',
     NODE_ENV: (process.env.NODE_ENV as 'development' | 'production') || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
}

if (config.NODE_ENV === 'production' && !config.PAYSTACK_SECRET_KEY) {
  throw new Error('Paystack secret key is required in production');
}

export default config;