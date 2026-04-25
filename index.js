const http = require('http');
const fs = require('fs');
// const path = require('path');

// const PORT = 8080;

// const server = http.createServer((req, res) => {
//     let filePath = '';
    
//     switch (req.url) {
//         case '/':
//             filePath = './index.html';
//             break;
//         case '/about':
//             filePath = './about.html';
//             break;
//         case '/contact-me':
//             filePath = './contact-me.html';
//             break;
//         default:
//             filePath = './404.html';
//     }
    
//     let contentType = 'text/html';
    

//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 fs.readFile('./404.html', (err404, content404) => {
//                     if (err404) {
//                         res.writeHead(404, { 'Content-Type': 'text/html' });
//                         res.end('<h1>404 - Page Not Found</h1>');
//                     } else {
//                         res.writeHead(404, { 'Content-Type': 'text/html' });
//                         res.end(content404);
//                     }
//                 });
//             } else {
//                 res.writeHead(500);
//                 res.end(`Server Error: ${err.code}`);
//             }
//         } else {
//             res.writeHead(200, { 'Content-Type': contentType });
//             res.end(content);
//         }
//     });
// });

const server = http.createServer((req, res) => {
    console.log(`Received request for: ${req.url}`);
    res.setHeader('Content-Type', 'text/html')
    
    let path = './' 
    switch (req.url) {
        case '/':
             path += 'index.html'; res.status(200); break;
        case '/about':
             path += 'about.html'; res.status(200); break;
        case '/contact-me':
             path += 'contact-me.html'; res.status(200); break;
        default:
             path += '404.html'; res.status(404); break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err)
            res.end()
        }
        else {
            res.end(data)
        }
    })
})

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
})