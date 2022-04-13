const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

const stripe = require("stripe")('');

const errorMiddleware = require("./middleware/error")

const cors = require("cors")

app.use(cors({origin: true,credentials:true}))

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

//route imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

//Middleware for errors
app.use(errorMiddleware)



module.exports = app
