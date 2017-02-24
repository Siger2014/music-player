const express = require('express');
const path = require('path');
const http = require('http');
var app  = express();

app.use(express.static(path.join(__dirname,'../')));

var finalUrl = 'http://127.0.0.1:3000'
app.use('/api/contacts',(req,response,next)=>{
    http.get(`${finalUrl}/contacts`,res=>{
        let data = '';
        res.on('data',function (chunk) {
            data += chunk;
        })
        res.on('end',function () {
            response.end(data);
        })
    })
})

app.listen(5000,function () {
    console.log('服务器已经开启，请访问5000端口');
})