const Stripe = require("stripe");
const express = require("express");
const app = express();
app.use(express.static("public"));

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    const payload = request.body;
    const payloadString = JSON.stringify(payload, null, 2);

    endpointSecret =
      "whsec_417b199438d6a93d021b943feedeb945cdb07cad96d6c7d1030ddb161f16c7f0";
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let data;
    let eventType;
    let event;

    //   request.resume();
    //   const rawBuffer = await rawBody(request);

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          payloadString,
          header,
          endpointSecret
        );
        console.log("Webhook đã được verified!");
      } catch (err) {
        console.log("Payload là ", payload);
        console.log(`Webhook Error123: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
      }

      data = event.data.object;
      eventType = event.type;
      console.log("data", data);
      console.log("eventTye:", eventType);
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }

    // Handle the event
    if (eventType == "checkout.session.completed") {
      stripe.customers
        .retrive(data.customer)
        .then((cus) => {
          console.log(cus);
          console.log("data:", data);
        })
        .catch((error) => console.log(error.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

module.exports = router;
