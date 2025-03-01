const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

const PORT = 8080

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-sfnt',
    '.svg': 'image/svg+xml'
}

const server = http.createServer((req, res) => {
    // Serve static files
    const basePath = __dirname
    const filePath = path.join(basePath, req.url)

    const extname = String(path.extname(filePath)).toLowerCase()
    const contentType = mimeTypes[extname] || 'application/octet-stream'

    if (req.method === 'GET') {
        // Handle static files in specific folders (css, img, fonts, js)
        if (req.url.startsWith('/css/') || req.url.startsWith('/img/') || req.url.startsWith('/fonts/') || req.url.startsWith('/js/')) {
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' })
                    res.end('Not Found')
                    return
                }
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(content)
            })
            return
        }

        // Handle specific HTML routes
        switch (req.url) {
            case '/':
            case '/index.html':  // Serve index.html as the default route
                fs.readFile(path.join(basePath, 'index.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the index page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/login':
            case '/login.html':
                fs.readFile(path.join(basePath, 'login.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the login page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/index':
            case '/index.html':
                fs.readFile(path.join(basePath, 'index.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the index page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/register':
            case '/register.html':
                fs.readFile(path.join(basePath, 'register.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the registration page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/about':
            case '/about.html':
                fs.readFile(path.join(basePath, 'about.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the about page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/contact':
            case '/contact.html':
                fs.readFile(path.join(basePath, 'contact.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the contact page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/blog':
            case '/blog.html':
                fs.readFile(path.join(basePath, 'blog.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the blog page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/rooms':
            case '/rooms.html':
                fs.readFile(path.join(basePath, 'rooms.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the rooms page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            case '/elements':
            case '/elements.html':
                fs.readFile(path.join(basePath, 'elements.html'), 'utf-8', (err, data) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end('Error reading the elements page')
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(data)
                })
                break
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not Found')
        }
    }
    else if (req.method === 'POST') {
        switch (req.url) {
            case '/login':
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(body)

                    fs.readFile(path.join(basePath, 'users.json'), 'utf-8', (err, data) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' })
                            res.end('Error reading user data')
                            return
                        }

                        const users = JSON.parse(data)
                        const user = users.find(u => u.username === username && u.password === password)

                        if (user) {
                            res.writeHead(302, { 'Location': '/index' })
                            res.end()
                        } else {
                            res.writeHead(302, { 'Location': '/register' })
                            res.end()
                        }
                    })
                })
                break
            case '/register':
                let regBody = ''
                req.on('data', chunk => {
                    regBody += chunk.toString()
                })

                req.on('end', () => {
                    const { username, password } = querystring.parse(regBody)
                    const userData = { username, password }

                    fs.readFile(path.join(basePath, 'users.json'), 'utf-8', (err, data) => {
                        let users = []

                        if (!err) {
                            users = JSON.parse(data)
                        }

                        users.push(userData)

                        fs.writeFile(path.join(basePath, 'users.json'), JSON.stringify(users, null, 2), (err) => {
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
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Not Found')
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})