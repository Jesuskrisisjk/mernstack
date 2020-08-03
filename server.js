const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
require('dotenv').config();
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.ATLAS_URI; 

app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

mongoose.connect(MONGODB_URI, {  useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true});
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});



app.get('/', function(request, response) { response.send('Hello World!') });

app.listen(PORT, function() { 
    console.log(`Server listening on port ${PORT}`) });