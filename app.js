const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('./logging/morgan');
const routes = require('./routes/index');
const logger = require('./logging/logger');
const stateWiseRoutes = require('./routes/stateWise');
const router = require('./routes/index');
const app = express();

// Middlewares
app.use(express.json());
app.use(compression());
app.use(cors());
require('dotenv').config();

mongoose.connect(
        process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    .then(() => {
        logger.info('Connected to DB');
    })
    .catch((err) => {
        logger.error(err);
        process.exit(2);
    });
// Logging
app.use(morgan);

// Mount routes
app.use('/api/patients', routes);
app.use('/api/statewise', stateWiseRoutes);
module.exports = app;