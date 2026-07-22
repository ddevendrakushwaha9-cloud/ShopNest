const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authentication = require('./routes/authRoutes')
dotenv.config();
const path = require("path");


const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

connectDB();

const app = express();
// Set CORS for frontend URL / allow single-node deploy
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({extended: true }))



app.use('/api/auth', authentication);
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("ShopNest backend is working properly!");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});