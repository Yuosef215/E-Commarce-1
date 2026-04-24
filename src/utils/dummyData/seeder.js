const path = require('path');
const dotenv = require('dotenv');
console.log('Path:', path.resolve(__dirname, '../../config.env'));
dotenv.config({ path: 'C:/Users/Administrator/E-Commarce-1/config.env' });console.log('DB_URL:', process.env.DB_URL);
const fs = require('fs');
const Product = require('../../models/productModel');
const dbConnect = require('../../config/database');
require('colors');



dbConnect();

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'products.json'))
);
const insertData = async () => {
    try {
        await Product.create(products);
        console.log('Data inserted successfully'.green.bold);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data deleted successfully'.red.bold);
        process.exit();
    } catch (error) {
        console.error(error);
    }
};

// node seeder -i to import data
// node seeder -d to delete data
if (process.argv[2] === '-i') {
    insertData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
