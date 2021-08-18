var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log("_url = "+_url);   // query string이 콘솔에 찍힘
    var queryData = url.parse(_url, true).query;    // 객채가 담김
    // var queryData = new URL('http://localhost:3000' + _url).searchParams;    nodejs v16부터 이 방식으로 변경 됨
    // console.log(queryData.get('id'));
    console.log("queryData.id = "+queryData.id);
    if(_url == '/'){
        _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
        return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url);
    // response.end(fs.readFileSync(__dirname + _url));    // _url 응답
    response.end(queryData.id)
});
app.listen(3000);