const http = require('http');
const fs =require('fs');
const path = require('path');
const url = require('url'); // to provide additional data

const fileName = 'example.txt';
const filePath = path.join(__dirname, fileName);
const port = 3000;

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const operation = queryObject.operation;
    const dataToWrite = queryObject.data;

    switch (operation) {
        case 'read':
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading file: ' + err);
                    return;
                }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File contents: ' + data);
            });

            break;


        case 'write':
            if (!dataToWrite) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('data not provided.');
                return;
            }

            fs.writeFile(filePath, dataToWrite, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error writing to file: ' + err);
                    return;
                }


                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Data has been written successfully.');
            });
            break;
        case 'delete':
            // Delete the file
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error deleting file: ' + err);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File  deleted successfully.');
            });
            break;
        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('No extra data provided in the url');
    }
});



server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
