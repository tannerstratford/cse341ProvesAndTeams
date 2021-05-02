const fs = require('fs');
const { parse } = require('path');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];
    var users = [];
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<title>Prove 01</title>');
        res.write('<body>')
        res.write('<h1>Salutations Earth!</h1>');
        res.write('<form action = "/create-user" method = "POST"><input type = "text" name = "username"><button type = "submit">Send</button></input></form>');
        res.write('<form action = "/users" method = "POST"><button type = "submit">Go to users list</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];

            fs.appendFile('create-user.txt', username + '=', err => {
                console.log(parsedBody.split('=')[1]);
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });
    }

    if (url === '/users') {
        users.push('jsmith1234');
        users.push('eviej123');

        fs.readFile('create-user.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(data);
            res.setHeader('Content-Type', 'text/html');
            res.write('<style> table, th, td {border: 1px solid black;}</style>')
            res.write('<html>');
            res.write('<body>');
            res.write('<table style="width:50%">');
            res.write('<tr><th>Username</th></tr>');

            for (user in data.split('=')) {
                res.write('<tr> <td>' + data.split('=')[user] + '</td> </tr>');
                console.log(data.split('=')[user]);
            }

            res.write('</table>');
            return res.end();
        });

    }
}

module.exports = requestHandler;