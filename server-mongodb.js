require('dotenv').config();
const express = require('express');
const app = express();
const mongodb = require('mongodb');

app.use(express.static('public'));
app.use(express.json());

const MongoClient = mongodb.MongoClient;
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/`;
// const url = 'mongodb://localhost:27017';
const dbName = 'productsMongoDB';
const collectionName = 'products';

app.get('/get', async (req, res) => {
    try {
        let client = await MongoClient.connect(url);
        let db = client.db(dbName);
        let collection = db.collection(collectionName);
        let data = await collection.findOne();
        if (!data) {
            data = {
                "accounts_id": 1,
                "accounts": [],
                "products_counter": 1,
                "products": []
            };
            await collection.insertOne(data);
        }
        res.send(data);
    } catch (error) {
        console.error('Error occurred while fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/post', async (req, res) => {
    try {
        let client = await MongoClient.connect(url);
        let db = client.db(dbName);
        let collection = db.collection(collectionName);
        let newData = req.body;
        delete newData._id;
        await collection.updateOne({}, { $set: newData });
        res.end();
    } catch (error) {
        console.error('Error occurred while updating data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



