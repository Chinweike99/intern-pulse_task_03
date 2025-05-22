import dotenv from 'dotenv';
dotenv.config();
const config = {
    PORT: parseInt(process.env.PORT || '3000'),
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || '',
    PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',
};
export default config;
