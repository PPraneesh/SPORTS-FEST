const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});