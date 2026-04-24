const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./src/config/database');
const categoryRoute = require('./src/routes/categoryRoute');
dotenv.config({ path: 'config.env' });
const ApiError = require('./src/utils/ApiError');
const globalErrorHandler = require('./src/middlewares/errorMiddleware');
const subCategoryRoute = require('./src/routes/subCategoryRoute');
const brandRoute = require('./src/routes/brandRoute');
const productRoute = require('./src/routes/productRoute');
const qs = require('qs');

dbConnection();
const app = express();
app.use(express.json());
app.set('query parser', (str) => qs.parse(str));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`)
};

app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);
app.use((req, res, next) => {
    next(new ApiError(`Not Found - ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
});

// handler unhandledRejection error
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection Errors: ${err.name} - ${err.message}`);
    server.close(() => {
        console.log("Shutting down...");
        process.exit(1);
    });
});
