require('dotenv').config();
require('express-async-errors');
//security Packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const express = require('express');
const app = express();
// Rate Limiter
const { apiLimiter, authLimiter } = require('./middleware/rate-limiter');

//connectdb
const connectDB = require('./db/connect')

//authmiddleware
const authenticateUser = require('./middleware/authentication')

const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);

// Security headers and body parser
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

app.use('/api/v1/auth', authLimiter);
app.use('/api/v1/jobs', apiLimiter);

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
