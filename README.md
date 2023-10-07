# CreditCardApp

This project implements a simple payment information validation system for an e-commerce website. The system consists of a frontend application built with React and a backend API built with Node.js.

## Prerequisites

Before running the project, make sure you have the following installed:

- Docker: [Download Docker](https://www.docker.com/get-started)

## Getting Started
Clone the repository:
```
git clone https://github.com/Siziii/CreditCardApp
```
Run the following command in the project root directory to build and start the containers:
```
docker-compose up
```

## Usage
1. Open your web browser and navigate to the frontend application at http://localhost:3000.

2. You should see a simple page with an input form to enter credit card information.

3. Enter the credit card details and click the "Pay" button.

4. The frontend will make an API request to the backend for validation.

5. The backend will respond with either a success or failure message.

6. The frontend will display a green border for success or a red border for failure based on the validation result.

