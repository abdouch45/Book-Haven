const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./routes/api');
const path=require('path')
const bodyParser = require('body-parser');


const app = express();
const PORT =  8888;
mongoose.connect('mongodb://127.0.0.1:27017/miniProjet2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, console.log("Server start for port: " + PORT))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json());
app.use('/', Routes);


