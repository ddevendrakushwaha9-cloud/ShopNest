const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./model/Product');
const User = require('./model/User');
const Order = require('./model/Order');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Comfortable over-ear headphones with crystal clear sound and long battery life.',
    price: 49.99,
    category: 'Electronics',
    stock: 85,
    imageUrl: 'https://i.ibb.co/kqk9Y0z/headphones.jpg',
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Stylish denim jacket with a modern fit and durable stitching.',
    price: 59.99,
    category: 'Fashion',
    stock: 60,
    imageUrl: 'https://i.ibb.co/VQLS6cP/denim-jacket.jpg',
    rating: 4.3,
    numReviews: 24,
  },
  {
    name: 'Sports Running Shoes',
    description: 'Lightweight running shoes designed for comfort and maximum support.',
    price: 74.99,
    category: 'Footwear',
    stock: 110,
    imageUrl: 'https://i.ibb.co/ZGwZQv0/running-shoes.jpg',
    rating: 4.7,
    numReviews: 46,
  },
  {
    name: 'Smart Fitness Band',
    description: 'Track your activity, heart rate, and sleep with this easy-to-use fitness tracker.',
    price: 34.99,
    category: 'Fitness',
    stock: 95,
    imageUrl: 'https://i.ibb.co/WfM09vL/fitness-band.jpg',
    rating: 4.2,
    numReviews: 30,
  },
  {
    name: 'Aromatic Scented Candle Set',
    description: 'Set of 3 long-lasting scented candles for home relaxation and décor.',
    price: 24.99,
    category: 'Home',
    stock: 72,
    imageUrl: 'https://i.ibb.co/J3YXkH2/candle-set.jpg',
    rating: 4.1,
    numReviews: 18,
  },
  {
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charger compatible with most Qi-enabled smartphones.',
    price: 29.99,
    category: 'Accessories',
    stock: 130,
    imageUrl: 'https://i.ibb.co/5Y4YX15/wireless-charger.jpg',
    rating: 4.6,
    numReviews: 40,
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@shopnest.com',
    password: 'Admin123!',
    role: 'admin',
    verified: true,
  },
  {
    name: 'Normal User',
    email: 'user@shopnest.com',
    password: 'User123!',
    role: 'user',
    verified: true,
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    const createdProducts = await Product.insertMany(products);

    const normalUser = createdUsers.find((user) => user.role === 'user');
    const adminUser = createdUsers.find((user) => user.role === 'admin');

    const orders = [
      {
        user: normalUser._id,
        items: [
          {
            productId: createdProducts[0]._id,
            qty: 2,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[4]._id,
            qty: 1,
            price: createdProducts[4].price,
          }
        ],
        totalAmount: createdProducts[0].price * 2 + createdProducts[4].price,
        address: {
          fullName: 'John Doe',
          street: '123 Maple Street',
          city: 'Mumbai',
          postalCode: '400001',
          country: 'India',
        },
        paymentId: 'PAY123456789',
        status: 'pending',
      },
      {
        user: normalUser._id,
        items: [
          {
            productId: createdProducts[2]._id,
            qty: 1,
            price: createdProducts[2].price,
          },
          {
            productId: createdProducts[5]._id,
            qty: 1,
            price: createdProducts[5].price,
          }
        ],
        totalAmount: createdProducts[2].price + createdProducts[5].price,
        address: {
          fullName: 'Priya Sharma',
          street: '45 Green Avenue',
          city: 'Delhi',
          postalCode: '110001',
          country: 'India',
        },
        paymentId: 'PAY987654321',
        status: 'shipped',
      },
      {
        user: adminUser._id,
        items: [
          {
            productId: createdProducts[1]._id,
            qty: 1,
            price: createdProducts[1].price,
          }
        ],
        totalAmount: createdProducts[1].price,
        address: {
          fullName: 'Admin User',
          street: '1 Corporate Drive',
          city: 'Bengaluru',
          postalCode: '560001',
          country: 'India',
        },
        paymentId: 'PAY555555555',
        status: 'delivered',
      }
    ];

    await Order.insertMany(orders);

    console.log('Seed data inserted successfully with orders.');
  } catch (error) {
    console.error('Seed data failed:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

seedDatabase();
