const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const PORT = 8080
const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        switch (req.url) {
            case '/': {
                fs.readFile(path.join(__dirname, 'login.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the login page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                });
                break;
            }
            case '/index': {
                fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/signup': {
                fs.readFile(path.join(__dirname, 'signup.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the registration page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/contact': {
                fs.readFile(path.join(__dirname, 'contact.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/department': {
                fs.readFile(path.join(__dirname, 'department.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/blog': {
                fs.readFile(path.join(__dirname, 'blog.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/review': {
                fs.readFile(path.join(__dirname, 'review.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/about': {
                fs.readFile(path.join(__dirname, 'about.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/appointment': {
                fs.readFile(path.join(__dirname, 'appointment.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case '/doctor': {
                fs.readFile(path.join(__dirname, 'doctor.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the dashboard page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break;
            }
            case (req.url.match(/\.(jpg|jpeg|png|gif|css)$/) || {}).input: {
                const imagePath = path.join(__dirname, req.url);
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Image not found');
                    } else {
                        const ext = path.extname(imagePath).toLowerCase();
                        const contentType = `image/${ext.substr(1)}`;
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(data);
                    }
                });
                break;
            }
            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not Found')
            }
        }
    }
    else if (req.method === 'POST') {
        switch (req.url) {
            case '/login': {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(body)

                    // Read the users from the users.json file
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' })
                            res.end('Error reading user data')
                            return
                        }

                        // Parse the users data
                        const users = JSON.parse(data)

                        // Authenticate the user by checking the username and password
                        const user = users.find(u => u.username === username && u.password === password)

                        if (user) {
                            // If user is found, redirect to the dashboard
                            res.writeHead(302, { 'Location': '/index' })
                            res.end()
                        } else {
                            // If user is not found, redirect to the register page
                            res.writeHead(302, { 'Location': '/signup' })
                            res.end()
                        }
                    })
                })
                break
            }
            case '/signup': {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })
            
                req.on('end', () => {
                    const { username, password } = querystring.parse(body)
                    console.log('Received signup request:', { username, password }) // Log the received data
            
                    if (!username || !password) {
                        console.log('Invalid signup data')
                        res.writeHead(400, { 'Content-Type': 'text/plain' })
                        res.end('Invalid signup data')
                        return
                    }
            
                    const userData = { username, password }
            
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        let users = []
            
                        if (!err) {
                            try {
                                users = JSON.parse(data)
                            } catch (parseError) {
                                console.error('Error parsing users.json:', parseError)
                                res.writeHead(500, { 'Content-Type': 'text/plain' })
                                res.end('Error processing user data')
                                return
                            }
                        } else {
                            console.log('users.json not found, creating new file')
                        }
            
                        users.push(userData)
            
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (writeErr) => {
                            if (writeErr) {
                                console.error('Error saving registration data:', writeErr)
                                res.writeHead(500, { 'Content-Type': 'text/plain' })
                                res.end('Error saving registration data')
                                return
                            }
                            console.log('User registered successfully:', username)
                            res.writeHead(302, { 'Location': '/' })
                            res.end()
                        })
                    })
                })
                break
            }
            default: {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not Found')
            }
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
