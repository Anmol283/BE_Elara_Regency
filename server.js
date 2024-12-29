const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const PORT = 8080

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/': {
                serveFile('login.html', 'text/html', res)
                break
            }
            case '/index': {
                serveFile('index.html', 'text/html', res)
                break
            }
            case '/register': {
                serveFile('register.html', 'text/html', res)
                break
            }
            case '/rooms': {
                serveFile('rooms.html', 'text/html', res)
                break
            }
            case '/blog': {
                serveFile('blog.html', 'text/html', res)
                break
            }
            case '/contact': {
                serveFile('contact.html', 'text/html', res)
                break
            }
            case '/about': {
                serveFile('about.html', 'text/html', res)
                break
            }
            default: {
                // Handle static files (CSS, JS, images, etc.)
                if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|svg)$/)) {
                    const filePath = path.join(__dirname, req.url)
                    const extname = path.extname(filePath)
                    const contentType = getContentType(extname)
                    
                    serveFile(req.url.substr(1), contentType, res)
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' })
                    res.end('Not Found')
                }
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
                            res.writeHead(302, { 'Location': '/register' })
                            res.end()
                        }
                    })
                })
                break
            }
            case '/register': {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(body)
                    const userData = { username, password }

                    // Read existing users from users.json or create an empty array if file doesn't exist
                    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
                        let users = []

                        if (!err) {
                            users = JSON.parse(data)
                        }

                        // Save new user to the users array
                        users.push(userData)

                        // Write the updated users array to users.json
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
                            if (err) {
                                res.writeHead(500, { 'Content-Type': 'text/plain' })
                                res.end('Error saving registration data')
                                return
                            }
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

function serveFile(filename, contentType, res) {
    fs.readFile(path.join(__dirname, filename), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end(`Error reading the ${filename} file`)
            return
        }
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data)
    })
}

function getContentType(extname) {
    switch (extname) {
        case '.js':
            return 'text/javascript'
        case '.css':
            return 'text/css'
        case '.png':
            return 'image/png'
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg'
        case '.gif':
            return 'image/gif'
        case '.svg':
            return 'image/svg+xml'
        default:
            return 'text/html'
    }
}

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

