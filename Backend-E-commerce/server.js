const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173'], // Add your client origin here
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors('*',corsOptions));
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res)=>{
  return res.send("Welcome to my Ecommerce site!!");
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
