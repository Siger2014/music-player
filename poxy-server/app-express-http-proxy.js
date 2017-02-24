const express = require('express');
const path = require('path');
const http = require('http');
const proxy = require('express-http-proxy');

var app  = express();

app.use(express.static(path.join(__dirname,'../')));

var finalUrl = 'http://127.0.0.1:3000'

// 只要是以/api/*开头的请求路径，通过proxy中间件都会将请求原封不动的发到指定的终点服务器
// 终点服务器接收到请求之后，将响应数据响应给当前的这个服务器
app.use('/api',proxy(finalUrl));

app.listen(5000,function () {
    console.log('服务器已经开启，请反问5000端口');
})