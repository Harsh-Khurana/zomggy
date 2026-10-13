# Zomggy – Food Order App

A small food ordering app built with React 19, TypeScript and Vite, backed by a simple Express API. You can browse a menu of meals, add them to a cart, change quantities, and place an order through a checkout form.

## Features

- **Meal catalog**: meals (name, price, description, image) are loaded from the backend, with loading and error states.
- **Shopping cart**: add meals, raise or lower quantities, see a running total, and check the item count in the header.
- **Checkout**: a modal form (name, email, street, postal code, city) that posts the order to the backend and shows a success or error message.
- **Modals**: the cart and checkout use the native `<dialog>` element.

## Tech Stack

| Layer    | Tools                                                           |
| -------- | --------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite 7, ESLint                            |
| State    | React Context with `useReducer` (cart) and `useState` (UI flow) |
| Forms    | React 19 `useActionState` with form actions                     |
| Backend  | Node.js, Express 4, JSON files for storage                      |

## Project Structure

```
food-order/
├── backend/
│   ├── app.js                  # Express server (port 3000)
│   ├── data/
│   │   ├── available-meals.json  # Menu data
│   │   └── orders.json           # Submitted orders are appended here
│   └── public/images/          # Meal images served statically
├── public/                     # Static assets for the frontend
└── src/
    ├── App.tsx                 # Root component wiring providers + UI
    ├── components/
    │   ├── Header.tsx          # Logo, title and cart button
    │   ├── Meals.tsx           # Fetches and lists meals
    │   ├── MealItem.tsx        # Single meal card
    │   ├── Cart.tsx            # Cart modal
    │   ├── CartItem.tsx        # Cart line item with +/- controls
    │   ├── Checkout.tsx        # Checkout form modal
    │   └── UI/                 # Button, Input, Modal, Error
    ├── hooks/useHttp.ts        # Custom hook for fetch + loading/error state
    ├── store/                  # CartContext and UserProgressContext
    └── util/formatting.ts      # USD currency formatter
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### 1. Start the backend

```bash
cd backend
npm install
npm start
```

The API runs at `http://localhost:3000`.

### 2. Start the frontend

In a second terminal, from the project root:

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

> The frontend calls `http://localhost:3000` directly, so the backend has to be running for meals to load and orders to go through.

## API

| Method | Endpoint    | Description                                                |
| ------ | ----------- | ---------------------------------------------------------- |
| GET    | `/meals`    | Returns the list of available meals                        |
| POST   | `/orders`   | Validates and saves an order to `backend/data/orders.json` |
| GET    | `/images/*` | Serves meal images                                         |

Example `POST /orders` body:

```json
{
  "order": {
    "items": [{ "id": "m1", "name": "Mac & Cheese", "price": "8.99", "quantity": 2 }],
    "customer": {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "street": "123 Main St",
      "postal-code": "12345",
      "city": "Springfield"
    }
  }
}
```

## Scripts

Frontend (project root):

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |

Backend (`backend/`):

| Command     | Description              |
| ----------- | ------------------------ |
| `npm start` | Start the Express server |
