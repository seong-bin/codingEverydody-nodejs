var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(url.parse(_url, true)); // 주어진 url정보를 분석해서 json형식으로 던짐
    var queryData = url.parse(_url, true).query;    // 객채가 담김
    var pathName = url.parse(_url, true).pathname;
    // var queryData = new URL('http://localhost:3000' + _url).searchParams;    nodejs v16부터 이 방식으로 변경 됨
    // console.log(queryData.get('id'));
    var title = queryData.id;

    if(pathName === '/'){
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ul>
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
        });
    } else{
        response.writeHead(404);
        response.end('Not found!');
    }
});
app.listen(3000);