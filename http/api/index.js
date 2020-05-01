// Loading requirements
const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

// Imports the data
const data = require('./urls.json');

// Writes the received query information into the "database"
function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err

            cb(JSON.stringify({message: "ok"}));
        }
    )
}

// Creates the server API and establishes connection on port 3000
http.createServer((req,res) => {
    const { name, url, del } = URL.parse(req.url, true).query;

    // Disables CORS restriction
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    // If there's no 'name' or 'url' input, nothing is done
    if (!name || !url) 
        return res.end(JSON.stringify(data));

    // If the 'del' query is passed, the information will be removed
    if (del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url));
       
        return writeFile((message) => res.end(message));
    }

    // If there's 'name', 'url' and no 'del', information will be added 
    data.urls.push({name, url});
    
    return writeFile((message) => res.end(message));
    

}).listen(3000, () => console.log('Api is running'));