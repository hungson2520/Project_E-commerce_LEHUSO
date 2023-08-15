// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

/**
 * . Điều này cho phép bạn sử dụng Stripe API trong mã của mình.
 * Tuy nhiên, điều này chỉ tải module "stripe" vào biến Stripe chưa có giá trị, tức là Stripe chưa được khởi tạo.
 */

// ở metadata có 1 siêu bug giới hạn 500 từ á nha, từ từ fix sau
const Stripe = require("stripe");
const express = require("express");
const app = express();
app.use(express.static("public"));

require("dotenv").config();

const rawBody = require("raw-body");
const { Order } = require("../models/order");

/**
 * Bạn sử dụng hàm Stripe() (được truy cập từ module "stripe") và cung cấp một khóa truy cập của Stripe. 
 * Trong đoạn mã này, khóa truy cập của Stripe được lưu trữ trong biến môi trường process.env.STRIPE_KEY.
Ví dụ, nếu khóa truy cập của Stripe của bạn là "sk_test_1234567890", thì dòng mã trên sẽ trở thành:
const stripe = Stripe("sk_test_1234567890");
Bây giờ, biến stripe sẽ chứa một đối tượng Stripe đã được khởi tạo và sẵn sàng sử dụng trong
 ứng dụng của bạn để thực hiện các yêu cầu gọi đến Stripe API, chẳng hạn như 
 tạo phiên thanh toán, xử lý thanh toán, quản lý đơn hàng, và nhiều tính năng khác liên quan đến thanh toán điện tử và giao dịch trực tuyến.
 * 
 */
const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { cardItems } = req.body;
  console.log("cartItems:: là ", cardItems);

  if (!cardItems || cardItems.length === 0) {
    return res
      .status(400)
      .send("Vui lòng cung cấp các mục hàng trong giỏ hàng.");
  }
  const customer = await stripe.customers.create({
    // ở metadata có 1 siêu bug giới hạn 500 từ á nha, từ từ fix sau
    metadata: {
      userId: req.body.userId,
      // cart: JSON.stringify(cardItems),
    },
  });
  const line_items = cardItems?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image.url],
          description: item.desc,
          // Thêm thông tin địa chỉ giao hàng vào metadata của mục hàng
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.cart1ProductQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "CA", "VN"] },

    phone_number_collection: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 20,
            currency: "usd",
          },
          display_name:
            "Express Shipping 1 Day - Delivery within 1 business day",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 2,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 10,
            currency: "usd",
          },
          display_name:
            "Express Shipping 3 Days - Delivery within 3 business days",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 5,
            },
          },
        },
      },
    ],
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

// Tạo 1 order mới vào database
const createOrder = async (customer, data, lineItems) => {
  // const Items = JSON.parse(customer.metadata.cart);
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntendId: data.payment_intent,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const saveOrder = await newOrder.save();
    console.log(" ĐÃ TẠO ĐƠN HÀNG THÀNH CÔNG !!!", saveOrder);
  } catch (error) {
    console.log("có lỗi khi tạo đơn hàng", error);
  }
};

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),

  (request, response) => {
    const sig = request.headers["stripe-signature"];
    console.log("request.readable", request.readable);

    let endpointSecret;
    endpointSecret =
      "whsec_417b199438d6a93d021b943feedeb945cdb07cad96d6c7d1030ddb161f16c7f0";

    const payload = request.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });
    let data;
    let eventType;
    let event;

    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(
          payloadString,
          header,
          endpointSecret
        );
        console.log("Webhook đã được verified!");
      } catch (err) {
        // console.log("Payload là ", payload);
        console.log(`Webhook Error123: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
      }

      data = event.data.object;
      eventType = event.type;
      // console.log("data", data);
      // console.log("eventTye:", eventType);
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }

    // Handle the event
    if (eventType == "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((cus) => {
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function (error, lineItems) {
              console.log("lineItems", lineItems);
              createOrder(cus, data, lineItems);
            }
          );
        })
        .catch((error) => console.log(error.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  }
);

module.exports = router;
