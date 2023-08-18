# ecommerceMicroservice
This is microservice architecture implemented in an e-commerce app with the use RabbitMQ in nodeJS
---

# ecommerceMicroservice

## Overview
`ecommerceMicroservice` is a mini microservice system designed to illustrate the concepts of message and broker  using an e-commerce platform. Built with Node.js, this repository leverages the power of microservices architecture to portray how microservices enable scalable and efficient data processing. From user authentication to order management, each service is dedicated to a specific functionality, ensuring a modular and clean codebase.

## Table of Contents
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Services](#services)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/amaboh/ecommerceMicroservice.git
   cd ecommerceMicroservice
   ```

2. Navigate to each service directory and install the dependencies:
   ```bash
   cd auth-service
   npm install
   ```

   Repeat the above step for `product-service`, `order-service`, and other services.

3. Start each service (usually with `npm start` or `nodemon` if configured).

## Dependencies
- **amqplib**: For working with RabbitMQ.
- **express**: A fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: Implementation of JSON Web Tokens.
- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **nodemon**: Monitor for any changes in your Node.js application and automatically restart the server.

## Services
- **auth-service**: Handles user authentication and token generation.
- **product-service**: Manages product listings and details.
- **order-service**: Takes care of order placements and tracking.
(Add other services as needed)

## Usage
After setting up the services, each microservice will run on its own port and can be accessed via HTTP requests. Ensure all services are running to have the full functionality of the e-commerce platform.

API Endpoints
##### Auth Service
- Register a new user:

Endpoint: POST /auth/register

- User Login:

Endpoint: POST /auth/login

#### Product Service
- List all products:

Endpoint: GET /products
Response: An array of available products.

- Add a new product:

Endpoint: POST /products/add

#### Order Service
- Place an order:
Endpoint: POST /orders/place

### Tips
Always ensure you have the necessary authentication tokens (if required) in your request headers.
Monitor service logs for any errors or issues.
Use tools like Postman or cURL for testing the API endpoints.

---

This is a basic structure, and you can always customize it further based on the specific needs and characteristics of your project. 

![MicroserviceSystem 001](https://user-images.githubusercontent.com/85511496/175569034-6d3cac31-6fba-4ec7-968a-80e96ddd5905.jpeg)
![MicroserviceSystem 002](https://user-images.githubusercontent.com/85511496/175569238-ef561d8e-cde0-420e-b34d-21733951c642.jpeg)

