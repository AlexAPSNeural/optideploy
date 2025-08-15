const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.send({ status: 'OptiDeploy running' });
});

app.use('/api/deploy', require('./routes/deploy'));

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`OptiDeploy server running on port ${PORT}`);
});

module.exports = app;