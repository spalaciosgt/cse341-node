const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

     //console.log(req.url, req.method, req.headers);
     if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write(' <head><title>My Page</title></head>')
        res.write(' <body><form action="/message" method="POST"><input name="message" type="text" /> <button type="submit">Send</button></form></body>')
        res.write('</html>')   
        return res.end();
    }
    console.log("URL = " + url);
    console.log("Method = " + method);
    
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {            
            console.log("chunk " + chunk);
            body.push(chunk);
        });
        return req.on('end', () => {            
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            console.log("parseBody " + parseBody);
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });                   
        });
    }

    //process.exit();
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write(' <head><title>My Page</title></head>')
    res.write(' <body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end();
}

module.exports = requestHandler;