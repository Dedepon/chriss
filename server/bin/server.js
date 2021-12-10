#!/usr/bin/env node

/**
 * Module dependencies.
 */
const app = require("../app");
const debug = require("debug")("mean-app:server");
// const https = require("https");
const http = require("http");
// const fs = require('fs');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/*
 * Get certificate (fullChain.pem contains cert.pem and chain.pem)
 */
// const privateKey = fs.readFileSync('../cert/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('../cert/cert.pem', 'utf8');
// const ca = fs.readFileSync('../cert/chain.pem', 'utf8');

/**
 * Create HTTPS server.
 */
// const httpsServer = https.createServer({
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// }, app)

/**
 * Create HTTP server.
 */
const httpServer = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(port);
// httpsServer.listen(port);
httpServer.on("error", onError);
// httpsServer.on("error", onError);
httpServer.on("listening", onListening);
// httpsServer.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);
}
