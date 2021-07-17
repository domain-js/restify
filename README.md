# @domain.js/router
Domain.js 项目通用桥接 http server 模块使用到的路由功能, 基于 restify

[![Build status](https://travis-ci.com/domain-js/router.svg?branch=master)](https://travis-ci.org/domain-js/router)
[![codecov](https://codecov.io/gh/domain-js/router/branch/master/graph/badge.svg)](https://codecov.io/gh/domain-js/router)

# Installation
<pre>npm i @domain.js/router --save</pre>

# 环境变量
* `PROXY_IPS` 代理服务的IP, 多个用逗号分隔, 默认 127.0.0.1 

<pre> 注: PROXY_IPS 关乎 profile.realIp 的计算，正确设置 PROXY_IPS 可以确保 realIp 不会被请求端伪造, 从而保证在某些和ip相关的限制功能的安全性</pre>

# Usage (sample)
```javascript
const restify = require('router');
const Router = require('@domain.js/router');

const domain = {
  home: {
    async index(profile, params) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ foo: 'bar' })
        }, 100);
      });
    }
  }
}
const routers = (r) => {
  r.get('/home', 'home.index')
}
const httpCodes = {
  noAuth: 401,
  notFound: 404,
  notAllowed: 403,
  tokenError: 403,
}


const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024 // 参数最大容量 2MB
  })
);

const router = Router(server, domain, httpCodes);
routers(router);

server.listen(
  process.env.HTTP_PORT || 8088,
  process.env.HTTP_HOST || "127.0.0.1",
  () => {
    console.log("%s listening at %s", server.name, server.url);
  }
);
```
