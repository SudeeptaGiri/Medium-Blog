const express = require('express')
const cors = require('cors');

const app = express();
const port = 8080;

const { connectToDatabase } = require('./utils/db');
const authRoutes = require('./routes/auth.routs');
const blogRoutes = require('./routes/blog.routs')

app.use(cors());
app.use(express.json());

app.use('/api/v1', authRoutes);
app.use('/api/v1', blogRoutes)


connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
 .catch(err => {
  console.error('Failed to connect to the database:', err);
});