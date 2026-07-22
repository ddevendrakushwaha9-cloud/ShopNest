# ShopNest 🛒

ShopNest is a full-stack e-commerce web application built using the MERN stack.  
It provides a complete shopping experience with user authentication, product management, cart functionality, and online payment integration using Razorpay.

## 🚀 Features

- User Registration and Login
- Email OTP Verification
- JWT Authentication
- Browse Products
- Product Search
- Product Details Page
- Add to Cart
- Update and Remove Cart Items
- Order Placement
- Razorpay Payment Gateway Integration
- Responsive UI
- Admin Product Management

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (Image Upload)

### Payment
- Razorpay Test Mode Integration

## 📂 Project Structure

```
ShopNest/
│
├── frontend/        # React frontend
├── backend/         # Node.js + Express backend
├── postman/         # API testing collection
└── README.md
```

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/ddevendrakushwaha9-cloud/ShopNest.git
cd ShopNest
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_secret
```

Run backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 💳 Payment Testing

This project uses Razorpay Test Mode.

No real money will be charged during testing.

Use Razorpay supported test payment methods to complete transactions.

## 🔗 API Testing

Postman collection is available in:

```
postman/ShopNest.postman_collection.json
```

Import this file into Postman to test APIs.

## Admin detail
- email - admin@gmail.com
- password - admin

## 🔮 Future Improvements

- Product Reviews and Ratings
- Wishlist Feature
- Order History
- Advanced Admin Dashboard
- Product Recommendation System

## 👨‍💻 Author

Devendra Kushwaha
