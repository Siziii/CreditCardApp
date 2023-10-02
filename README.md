# CreditCardApp

This project implements a simple payment information validation system for an e-commerce website. The system consists of a frontend application built with React and a backend API built with Node.js.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): [Download npm](https://www.npmjs.com/get-npm)
- Git: [Download Git](https://git-scm.com/downloads)

## Getting Started
Clone the repository:
```
git clone https://github.com/Siziii/CreditCardApp
```
### Frontend
1. Navigate to the frontend directory:
```
cd CreditCardApp/client
```
2. Install the frontend dependencies:
```
npm install
```
3. Start the frontend development server:
```
npm start
```
### Backend
1. Navigate to the backend directory:
```
cd CreditCardApp/server
```
2. Install the backend dependencies:
```
npm install
```
3. Start the backend server:
```
npm run dev
```

## Usage
1. Open your web browser and navigate to the frontend application at http://localhost:3000.

2. You should see a simple page with an input form to enter credit card information.

3. Enter the credit card details and click the "Pay" button.

4. The frontend will make an API request to the backend for validation.

5. The backend will respond with either a success or failure message.

6. The frontend will display a green border for success or a red border for failure based on the validation result.

