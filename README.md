# Payment Gateway API

### InternPulse task03

A RESTful API for processing payments through Paystack, designed for small businesses. This API allows businesses to accept payments from customers with minimal information (name, email, and amount).

## Features

- Initiate payments via Paystack
- Check payment status
- Rate limiting for API protection
- CI/CD pipeline with GitHub Actions
- Automated testing with Jest
- TypeScript support
- API versioning

## Technologies Used

- **Backend**: Node.js, Express
- **Language**: TypeScript
- **Payment Gateway**: Paystack
- **CI/CD**: GitHub Actions, Render
- **Testing**: Jest, Supertest
- **Rate Limiting**: express-rate-limit

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Paystack account (for API keys)
- Render account (for deployment)
- GitHub account

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/payment-gateway-api.git
cd payment-gateway-api
```

### 2. Install Dependencies

```bash
 npm install
```

### 3. Environment Variable
```bash
PORT=3000
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_BASE_URL=https://api.paystack.co
```
### 4.Running the Application
Development mode:
```bash
    npm run dev
```
Production mode:
```bash
    npm run build
    npm start
```
### 4.Testing
```bash
    npm run test
```

### API Endpoints
Base URL
 - Local: http://localhost:3000

 - Production: https://intern-pulse-task-03.onrender.com/

### API Version: v1
### Payments
 - POST /api/v1/payments - Initiate a payment
 - GET /api/v1/payments/{id} - Check payment status

# CI/CD Pipeline
## The project includes GitHub Actions workflows for:
### 1. Continuous Integration (CI)
- Runs on every push/pull request to main branch
- Installs dependencies
- Builds the project
- Runs tests

### 2. Continuous Deployment (CD)
- Runs when CI passes on main branch
- Deploys to Render automatically

## Deployment
### The application is configured to deploy to Render. To set up:
 - Create a new Web Service on Render
 - Connect your GitHub repository
 - Add environment variables (same as .env file)
 - The CD pipeline will handle deployments automatically

## Rate Limiting
### The API has rate limiting configured:
- 100 requests per 15 minutes per IP address
- Exceeding the limit returns a 429 status code

## Contributing
 - Fork the repository
 - Create a new branch (git checkout -b feature-branch)
 - Commit your changes (git commit -m 'Add new feature')
 - Push to the branch (git push origin feature-branch)
 - Create a new Pull Request