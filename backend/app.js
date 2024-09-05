const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('./models');
const homeRoutes = require('./routes/homeRoutes');

// Middleware
app.use(express.json());

// Enable CORS for all routes and methods
app.use(cors());

// Routes
app.use('/user', userRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
