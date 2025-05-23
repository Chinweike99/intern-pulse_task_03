import dotenv from 'dotenv';
dotenv.config();
const config = {
    PORT: parseInt(process.env.PORT || '3000'),
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || '',
    PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',
    NODE_ENV: process.env.NODE_ENV || 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
};
if (config.NODE_ENV === 'production' && !config.PAYSTACK_SECRET_KEY) {
    throw new Error('Paystack secret key is required in production');
}
export default config;
