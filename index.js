const express=require('express')

const bodyParser=require('body-parser')
const stripe=require('stripe')('sk_test_51MM7n2SIvvrfTmkOyC1wGDIC0MrVdYVHUKK3hUyF2uCOU4NS0lBUoDbmeB2GA99F49i9pI03tJb6afUGoLKR2ygH00VXU57Ne6')
const uuid=require('uuid').v4
const cors=require('cors')
const path=require('path')
const PORT=process.env.PORT || 5000;

const app=express()
//Middlewares

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

//Routes
app.get('/',(req,res)=>{
    res.send("welcome to backend")
})

app.post('/checkout',async(req,res)=>{   
  const { product, token } = req.body;
    const idempontencyKey = uuid()

    console.log(token.id);
    console.log(idempontencyKey);

    const customer = await stripe.customers.create({
      description: 'Customer for ' , //is just for reference
      source: token.id //created by the front end createToken()
  })
  const chargeCustomer = stripe.charges.create({
    amount: 2000, //Required
    currency: "inr", //Required
    source: "tok_amex", //optional id of a card
    description: "Charge for aiden.wilson@example.com"
  }, function(err, charge) {
    if(err){
      res.status(400).send(err)
      console.log(err)
    } else {
        res.status(200).send({message:"charge success", id: charge.id})
    }
});
})

//Port listen
app.listen(PORT,()=>{
    console.log(`Server listing at port ${PORT}`)
})