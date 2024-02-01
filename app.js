import express from 'express'

const app = express()
const port = 3000

// Use express.json middleware to parse the body of the request
app.use(express.json())

app.post('/', (req, res) => {
  console.log("Req.body: ", req.body) // Log the body of the request
  res.send("Jabu's simple express app lol")
})

app.get('/inovio-postback', async (req, res) => {
  console.log("Req.query: ", req.query) // Log the body of the request
  const query = req.query;
  const status = query.TRANS_STATUS_NAME;
  const userId = query.xtl_udf01;
  const coins = query.xtl_udf02;

  if (status === 'APPROVED') {

    console.log("Coins :", typeof Number(coins), " ", coins);
    console.log("UserId :", typeof userId, " ", userId);

    res.redirect("http://localhost/auth/games-dash/fantasy/account?payment=success&coins=" + coins);   

  } else {
    res.redirect("http://localhost:3005/auth/games-dash/fantasy/account??payment=failure&coins=" + coins);
    //res.status(200).send('Transaction declined');
  }
})

app.listen(port, () => {
  console.log(`Jabu's express app listening on port ${port}`)
})