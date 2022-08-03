const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3500

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const verifyJwt = require('./middleware/verifyJWT')

app.use('/login', require('./router/login'))
app.use('/register', require('./router/register'))

app.use(verifyJwt.verifyJwt)
app.use('/employees', require('./router/api/employees'));

app.get('/', (req, res) => {
  res.send('Xin chao Quang Trieu!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})