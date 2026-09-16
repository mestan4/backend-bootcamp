const http = require('http');

// create an http server
const server = http.createServer((req, res) => {
  // Set the response status code and response headers
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  // prepare the response 
  const responseData = {
    message: 'Welcome to the Backend World!',
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  };

  // send JSON stringified response back to the client
  res.end(JSON.stringify(responseData, null, 2));
});

// define the port number, start listening for incoming requests
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});