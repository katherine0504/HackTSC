var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')

app.use(cors())
app.use(bodyParser.json())



app.post('/check', function (req, res, next) {
//   console.log(req.body["Inputs"]["input1"]["Values"])
  var headers = {
    "Authorization": "Bearer SokniUTeFzmkegzxpnVpOy+REV0DkIH8i632l2ce2Go5jkFrmUie6fSJMpj495GO5bWz/lgTzAQeW99qGcEcdg==",
    "Content-Length": req.body.length,
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  request.post({
        method: 'POST',
        url: "https://ussouthcentral.services.azureml.net/workspaces/abbad2b386164809ad1b972db76a2907/services/4de64799decb4d18ab312088b4e17c26/execute?api-version=2.0&details=true",
        headers: headers,
        body: JSON.stringify(req.body)
  },function (error, response, body) {
    //   console.log(body)
      res.write(body)
      res.send()
  })
})

app.listen(1234, function () {
  console.log('CORS-enabled web server listening on port 1234')
})