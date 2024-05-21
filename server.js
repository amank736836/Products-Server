const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/get', (req, res) => {
    let data = {
        "accounts_id": 1,
        "accounts":[],
        "products_counter":1,
        "products":[]
    }
    console.log('request received')
    try{
      let data1 = fs.readFileSync(__dirname + '/data.json');
      if(data1!=null && data1 != {}){
        data = JSON.parse(data1);
      }
    }
    catch(error){
      console.log(error);
      fs.writeFileSync(__dirname + '/data.json', JSON.stringify(data));
    }finally{
      res.json(data);
    }
});

app.post('/post', (req, res) => {
  let data = req.body;
  fs.writeFileSync(__dirname+'/data.json', JSON.stringify(data));
  res.end();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});