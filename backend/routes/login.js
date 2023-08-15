const express = require("express");
const Joi = require("joi");
const { User } = require("../models/user");
const bigcrypt = require("bcrypt");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();
const app = express();
app.use(express.json());
router.post("/", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(300).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user1 = await User.findOne({ email: req.body.email });
  if (!user1) {
    return res.status(400).send("Email Không chính xác!");
  }
  const { password } = req.body;
  // việc đảo ngược thứ tự của hai đối số trong hàm bigcrypt.compare() sẽ làm cho hàm hoạt động sai,
  // vì đối số đầu tiên của hàm là mật khẩu chưa hash, và đối số thứ hai là mật khẩu đã hash --> HOẠT ĐỘNG ĐÚNG , NGƯỢC LẠI SẼ GÂY RA SAI
  const isCheckPass = await bigcrypt.compare(req.body.password, user1.password);
  // console.log("user1.password", user1.password);
  // console.log("req.body.password", req.body.password);
  // console.log("isCheckPass", isCheckPass);
  if (!isCheckPass) {
    //return res.status(400).send(user1.password);
    return res.status(400).send("Đăng Nhập sai");
  }
  const token = generateAuthToken(user1);
  res.send(token);
});

module.exports = router;
