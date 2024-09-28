const http = require('http');
const fs = require('fs');


// Read the file asynchronously
const posts = fs.readFileSync('posts.json', encoding='utf8');
console.log(posts);

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(posts);
});

server.listen(8080);