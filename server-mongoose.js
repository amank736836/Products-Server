require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/')
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

const dataSchema = new mongoose.Schema({
  accounts_id: Number,
  accounts: Array,
  products_counter: Number,
  products: Array
});

const Data = mongoose.model('Data', dataSchema);

app.get('/get', async (req, res) => {
  let existingData = await Data.findOne();

  if(!existingData){
    existingData = new Data();
    existingData = await existingData.save();
  }
  res.send(existingData);
});
app.post('/post', async (req, res) => {
  try {
    let existingData = await Data.findOne();
    if (!existingData) {
      existingData = new Data();
    }
    console.log(req.body);
    existingData.accounts_id = req.body.accounts_id;
    existingData.accounts = req.body.accounts;
    existingData.products_counter = req.body.products_counter;
    existingData.products = req.body.products;
    existingData = await existingData.save();
    res.send(existingData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});