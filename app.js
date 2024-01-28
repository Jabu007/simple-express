import express from 'express'

const app = express()
const port = 3000

// Use express.json middleware to parse the body of the request
app.use(express.json())

app.post('/', (req, res) => {
  console.log("Req.body: ", req.body) // Log the body of the request
  res.send("Jabu's simple express app lol")
})

app.get('/success', (req, res) => {
  console.log("Req.query: ", req.query) // Log the body of the request
  res.send("Payment success")
})

app.post('/declined', (req, res) => {
  console.log("Req.query: ", req.query) // Log the body of the request
  res.send("Payment declined")
})

app.listen(port, () => {
  console.log(`Jabu's express app listening on port ${port}`)
})