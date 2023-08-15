const bigcrypt = require("bcrypt");

/**
 *joi trong Node.js để thực hiện việc kiểm tra và xác thực dữ liệu. joi là một thư viện hữu ích và mạnh mẽ để 
 kiểm tra tính hợp lệ của các đối tượng, chuỗi, mảng 
 và các kiểu dữ liệu khác trong JavaScript.

Ý nghĩa của joi như sau:

Kiểm tra tính hợp lệ của dữ liệu: joi cho phép bạn xác định các quy tắc và ràng buộc mà dữ liệu phải tuân thủ. 
Bằng cách định nghĩa các schema, bạn có thể kiểm tra xem dữ liệu có đúng định dạng, có đủ chiều dài, hoặc theo các yêu cầu khác không.

Xác thực dữ liệu đầu vào: Khi bạn nhận dữ liệu từ người dùng hoặc từ bên ngoài, đây là một thủ tục quan trọng để đảm bảo 
rằng dữ liệu đó là an toàn và hợp lệ trước khi sử dụng nó trong các chức năng, cơ sở dữ liệu, hoặc các xử lý khác. 
joi giúp bạn làm điều này bằng cách kiểm tra dữ liệu theo các quy tắc đã định nghĩa trước.

Hiển thị thông báo lỗi rõ ràng: Nếu dữ liệu không đáp ứng các yêu cầu trong schema, joi sẽ cung cấp các thông báo lỗi rõ ràng 
giúp bạn hiểu vì sao dữ liệu không hợp lệ. Điều này giúp bạn tìm và sửa lỗi một cách dễ dàng hơn.

Giảm thiểu lỗi khi xử lý dữ liệu: Bằng cách kiểm tra dữ liệu trước khi sử dụng, joi giúp giảm thiểu khả năng xảy ra lỗi trong ứng dụng của bạn do dữ liệu không hợp lệ.
 */
const joi = require("joi");
const express = require("express");
const Joi = require("joi");
const { User } = require("../models/user");
const generateAuthToken = require("../utils/generateAuthToken");
const app = express();
app.use(express.json());
const router = express.Router();
const cloudinary = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  const schema = joi.object({
    name: Joi.string().min(3).required().max(30),
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(300).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user1 = await User.findOne({ email: req.body.email });
  // ĐÃ TỒN TẠI NGƯỜI DÙNG TRONG DATABASE , KHÔNG CHO ĐĂNG KÝ
  if (user1) {
    return res
      .status(400)
      .send("Email này đã được dùng để đăng ký tài khoản rồi!");
  }
  const { name, password, email, image } = req.body;
  if (!image) {
    let newUser = new User({ name, email, password });
    // Chuẩn bị hash Mật Khẩu cho user
    const salt = await bigcrypt.genSalt(10);
    newUser.password = await bigcrypt.hash(newUser.password, salt);

    newUser = await newUser.save();
    const token = generateAuthToken(newUser);
    res.send(token);
  } else {
    const response = await cloudinary.uploader.upload(image, {
      upload_preset: "web_thuong_mai_dien_tu",
    });
    if (response) {
      const newUser = new User({
        name,
        email,
        password,
        image: response,
      });
      const salt = await bigcrypt.genSalt(10);
      newUser.password = await bigcrypt.hash(newUser.password, salt);

      newUser = await newUser.save();
      const token = generateAuthToken(newUser);
      res.send(token);
    }
  }
});
module.exports = router;
