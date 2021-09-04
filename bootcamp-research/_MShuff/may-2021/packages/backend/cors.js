// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

const express = require('express');
const cors = require('cors');
const app = express();

// // Enable ALL CORS request
// app.use(cors());

// app.get('/', (req, res, next) => {
//   console.log('CORS enabled on all origins!');
//   res.writeHead(200);
//   res.write('<html><body><h1>Hey</h1></body></html>');
//   res.end();
// });

// // Enable CORS on a single route

// app.get('/test', cors(), (req, res, next) => {
//   console.log('CORS on this route only...');
//   res.end();
// });

app.listen(8080, () => console.log('Listening on port 8080...'));
