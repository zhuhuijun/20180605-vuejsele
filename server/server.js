let http = require('http');
let url = require('url');
let fs = require('fs');
let seller = require('./seller');
let goods = require('./goods');
let ratings = require('./ratings');
/**
 * 创建服务
 */
http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1');
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") return res.end();
  let {pathname, query} = url.parse(req.url, true);
  if (pathname === '/seller') {
    let id = query.id;
    switch (req.method) {
      case 'GET':
        res.setHeader('Content-Type', "application/json;charset=utf8");
        return res.end(JSON.stringify(seller));
        break;
    }
  } else if ('/goods' === pathname) {
    switch (req.method) {
      case 'GET':
        res.setHeader('Content-Type', "application/json;charset=utf8");
        return res.end(JSON.stringify(goods));
        break;
    }
  } else if ('/ratings' === pathname) {
    switch (req.method) {
      case 'GET':
        res.setHeader('Content-Type', "application/json;charset=utf8");
        return res.end(JSON.stringify(ratings));
        break;
    }
  }else {
    res.statusCode = 404;
    res.end();
  }
}).listen(4000);
