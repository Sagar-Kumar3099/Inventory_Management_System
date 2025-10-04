const express = require('express');
const cors = require("cors");


const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();



app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong"
  });
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');
})