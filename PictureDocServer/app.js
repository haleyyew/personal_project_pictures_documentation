const express = require('express')
const bodyParser = require('body-parser')
const PicturesService  = require('./services/picturesService')
const app = express()
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.get('/', function (req, res) {
    res.send('Welcome to Grocery Service APIs.')
})

app.post('/api/addPicture', function (req, res) {
  let picturesServiceObj = new PicturesService(req, res)
  picturesServiceObj.addPicture()
})

app.post('/api/getPictures', function (req, res) {
  let picturesServiceObj = new PicturesService(req, res)
  picturesServiceObj.getPictures()
})

app.listen(3000, function () {
  console.log('Pictures Documentation service listening on port 3000!')
})