/** @format */

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const app = require('./app');
const mongoose = require('mongoose');
const { cloudinaryConnect } = require('./cloudinary/cloudinary');

mongoose
  .connect(process.env.DBR)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('DB connection failed');
    console.log(err);
  });
cloudinaryConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
