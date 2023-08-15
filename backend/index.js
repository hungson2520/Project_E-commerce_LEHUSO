// Root of App
const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/product");
const products = require("./products");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

/**
 * app.use(express.json()) là một middleware được sử dụng trong Express để xử lý dữ liệu được gửi đến từ client dưới định dạng JSON.
 * Khi client (trình duyệt, ứng dụng di động, hoặc bất kỳ client nào khác) gửi yêu cầu HTTP với dữ liệu dạng JSON (thông thường là thông qua phương thức POST hoặc PUT),
 * dữ liệu đó được gửi dưới dạng chuỗi JSON. Để ứng dụng Express có thể đọc và xử lý dữ liệu JSON này, chúng ta cần sử dụng middleware express.json().
 * Sau đó đưa vào trong đối tượng req.body (phần thân yêu cầu) để chúng ta có thể truy xuất và sử dụng dễ dàng trong các route handler hoặc các xử lý tiếp theo.
 */

/**
 * app.use(cors()) là một middleware sử dụng trong Express để xử lý vấn đề liên quan đến CORS (Cross-Origin Resource Sharing).
 *  CORS là một cơ chế an toàn trong trình duyệt để cho phép hoặc từ chối các yêu cầu từ các nguồn gốc (origin) khác nhau.
 *  Nó giúp đảm bảo rằng các trang web hoặc ứng dụng có thể yêu cầu tài nguyên từ các nguồn không thuộc cùng một nguồn gốc một cách an toàn.
 *
 *Khi bạn sử dụng app.use(cors()) trong Express, nó sẽ tự động thêm các header cần thiết vào phản hồi (response) từ server 
 để cho phép các yêu cầu từ các nguồn gốc khác nhau. 
 Điều này cho phép bạn vượt qua các hạn chế liên quan đến CORS và cho phép các ứng dụng hoặc trang web từ các domain khác có thể gửi yêu cầu đến server của bạn.
 *
 TÓM LẠI : CHO PHÉP REACT APP --------------ACCESS------------>NODEJS API
 */

const register = require("./routes/register");
const login = require("./routes/login");
const user = require("./routes/user");
const stripe = require("./routes/stripe");
const bodyParser = require("body-parser");
const order = require("./routes/order");
const ratingComment = require("./routes/ratingComment");
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.use(cors());

// req: được gửi từ FE ,
//res: nhận từ API
// app.use("/webhooks/stripe", bodyParser.raw({ type: "*/*" }), stripewebhooks);
//app.use(express.json());
// app.use(
//   bodyParser.json({
//     verify: function (req, res, buf) {
//       req.rawBody = buf;
//     },
//   })
// );
// app.use(bodyParser.json());
//app.use(express.json());
app.use(express.json({ limit: "5000kb" }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome to trang web bán hàng của sơn");
});
app.get("/products", (req, res) => {
  res.send(products);
});

/**
 * mới thêm
 */

// app.use(express.static("public"));

app.use("/api/stripe", stripe);

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/product", productRoute);
app.use("/api/user", user);
app.use("/api/order", order);
app.use("/api/ratingComment", ratingComment);

app.listen(port, console.log(`SERVER ĐANG HOẠT ĐỘNG TẠI PORT ${port}`));
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("KẾT NỐI TỚI TRANG WEB TMĐT MONGODB THÀNH CÔNG RỒI !")
  )
  .catch((error) => console.log("KẾT NỐI LỖI RỒI!", error.message));
