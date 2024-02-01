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
  const userID = query.xtl_udf01;
  const coins = query.xtl_udf02;

  if (status === 'APPROVED') {
    //Find the user by ID
    const user = await User.findById(userID);  
    //const user = await User.findOne({ _id: user_id });

    console.log("User: ", user, " coins: ", coins); 

    if (!user) {
      res.status(404).send('User not found.');
      return;
    } 

    console.log("Coins :", typeof Number(coins), " ", coins);


    user.athcoin_balance += Number(coins);
    await user.save();
    res.redirect("http://localhost/auth/games-dash/fantasy/account?payment=success&coins=" + coins);   
    //  res.status(200).send('Payment success');
    // res.send({ url: url });
  } else {
    res.redirect("http://localhost:3005/wallet?payment=failure&coins=" + coins);
    //res.status(200).send('Transaction declined');
  }
})

app.listen(port, () => {
  console.log(`Jabu's express app listening on port ${port}`)
})