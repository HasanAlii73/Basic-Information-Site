const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath = '';
    
    switch (req.url) {
        case '/':
            filePath = './index.html';
            break;
        case '/about':
            filePath = './about.html';
            break;
        case '/contact-me':
            filePath = './contact-me.html';
            break;
        default:
            filePath = './404.html';
    }
    
    let contentType = 'text/html';
    

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile('./404.html', (err404, content404) => {
                    if (err404) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 - Page Not Found</h1>');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content404);
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});