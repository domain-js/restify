const Router = require("./src/router");

const { MAX_FIELDS_SIZE, HTTP_PORT = "8088", HTTP_HOST = "127.0.0.1" } = process.env;

function Main(server, domain, routers, httpCodes) {
  server.use(restify.plugins.queryParser());
  server.use(
    restify.plugins.bodyParser({
      keepExtensions: true,
      maxFieldsSize: Number(MAX_FIELDS_SIZE) || 2 * 1024 * 1024, // 参数最大容量 2MB
    }),
  );

  routers(Router(server, domain));

  server.listen(HTTP_PORT, HTTP_HOST, () => {
    console.log("%s listening at %s", server.name, server.url);
  });

  return server;
}

module.exports = Main;
