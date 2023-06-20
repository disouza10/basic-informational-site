const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
  let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url)
  let extension = path.extname(filePath)
  let contentType = 'text/html'

  switch (extension) {
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
    case '.json':
      contentType = 'application/json'
      break;
    case '.png':
      contentType = 'image/png'
      break;
    case '.jpg':
      contentType = 'image/jpg'
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          response.writeHead(200, { 'Content-Type': 'text/html' })
          response.end(content, 'utf-8')
        })
      } else {
        response.writeHead(500)
        response.end(`Server error: ${err.code}`)
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(content, 'utf-8')
    }
  })
})

const PORT = 8080

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))