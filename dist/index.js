import app from "./app.js";
import config from './config/config.js';
app.listen(config.PORT, () => {
    console.log(`
    Server running in ${config.NODE_ENV} mode
    Listening on port ${config.PORT}
    Paystack API: ${config.PAYSTACK_BASE_URL}
    Production mode? ${config.IS_PRODUCTION}
  `);
});
