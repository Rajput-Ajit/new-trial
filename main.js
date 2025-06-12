const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		const fileName = "index.html";
		const readFile = fs.readFile(fileName, 'utf-8', (err, data)=>{
			if(err){
				console.error(err);
			}else{ 
				res.writeHead(200, { 'Content-Type': 'text/html' });
				 res.end(data);
			}
		});
	}else if(req.method === 'POST' && req.url === '/main'){
		let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

		req.on('end', () => {
			const data = querystring.parse(body);
			let name = data.myName;
			let url = data.myInput;
			const fileName = "data.json";
			const readFile = fs.readFile(fileName, 'utf-8', (err, data)=>{
			if(err){
					console.error(err);
					console.log(name + url);
					res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(data);
			}else{
				const fileName = "data.json";
					data = JSON.parse(data);
					let newObj = {
					  'ShortName': name,
					  'url': url
					};
					data.push(newObj)
					data = JSON.stringify(data);
					
				const writeFile = fs.writeFile(fileName, data, 'utf-8', (err)=>{
					if(err){
						console.error(err);
					}else{ 
						res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(data);
					}
				});

			}
		});
	});	
	}
});
	
	


const port = 3000;
server.listen(port, () => {
    console.log('Server is listening on port ' + port);
});