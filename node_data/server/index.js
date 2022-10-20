const http = require('http');

const hostname = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
    res.end('Hey!!! Hi, Welcome');
});

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
});