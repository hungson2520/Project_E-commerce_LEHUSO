const { user, User } = require("../models/user");
/**
 * moment là một thư viện JavaScript rất phổ biến và mạnh mẽ được sử dụng để làm việc với ngày và giờ trong JavaScript.
 * Nó cung cấp nhiều tính năng và phương thức hữu ích để định dạng, phân tích, tính toán và hiển thị các giá trị thời gian.
 */
const moment = require("moment");
const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const { auth, isAdmin, isUser } = require("../middleware/auth");

// THỐNG KÊ

/**
 * Ví dụ: Nếu bạn gọi yêu cầu GET đến "/statistics"
 * vào tháng 9 năm 2023, thì biến previousMonth sẽ chứa giá trị
 * "01-08-2023 00:00:00", đại diện cho ngày 01 tháng 8 năm 2023 lúc 00:00:00.
 * Trong trường hợp này, set("date", 1) được sử dụng để đặt giá trị ngày trong tháng thành 1.
 */

/**
 * Trong MongoDB, aggregate là một phương thức mạnh mẽ cho phép bạn thực hiện các phép toán trên dữ liệu trong một collection
 * và trả về kết quả sau khi đã xử lý dữ liệu theo các tập hợp các giai đoạn (stages) được định nghĩa trước.
 *  Nó cho phép bạn thực hiện các phép toán như lọc (filtering), nhóm (grouping), tính toán tổng hợp (aggregation),
 *  lấy mẫu (sampling), và sắp xếp (sorting) dữ liệu.
 */
// Chỉ có ADMIN MỚI CÓ THỂ  COI DANH SÁCH THỐNG KÊ NGƯỜI DÙNG
router.get("/statistics", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("DD-MM-YYYY HH:mm:ss");
  // truy vấn aggregate trong MongoDB sử dụng trong ứng dụng Node.js để thống kê số lượng người dùng đã được tạo trong tháng trước.
  try {
    const users = await User.aggregate([
      {
        /**
         * $match để lọc dữ liệu chỉ lấy những người dùng có trường createdAt (ngày tạo) lớn hơn
         *  hoặc bằng ngày đầu tiên của tháng trước( TỨC LÀ LẤY RA THÁNG NÀY VÀ THÁNG TRƯỚC)
         * previousMonth được tính toán trước đó để biểu thị tháng trước.
         *  Kết quả là một tập hợp (array) các bản ghi người dùng thỏa điều kiện lọc.
         */
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      /**
       *: Stage này sử dụng $project để chỉ lấy trường createdAt
        và sử dụng phép toán $month để trích xuất giá trị tháng từ trường createdAt. Kết quả là một tập hợp các đối tượng chứa trường month.
       */
      { $project: { month: { $month: "$createdAt" } } },

      /**
       *  Stage này sử dụng $group để nhóm các bản ghi theo trường _id: "month", nghĩa là gom tất cả các đối tượng
       * có trường month giống nhau vào một nhóm. Tiếp theo, sử dụng phép toán $sum
       * để tính tổng số đối tượng trong mỗi nhóm. Điều này sẽ cho kết quả thống kê
       *  số lượng người dùng được tạo trong tháng trước, và sẽ được đặt trong trường total
       *
       */
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.send(500).send(error);
  }

  res.send(previousMonth);
});

// Lấy danh sách tất cả người dùng

router.get("/", async (req, res) => {
  try {
    const user1 = await User.find().sort({ _id: -1 });
    res.status(200).send(user1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Xoá 1 người dùng
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deleteuser1 = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteuser1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// CHO PHÉP CHỈ NGƯỜI DÙNG ĐÓ VÀ ADMIN XEM THÔNG TIN NGƯỜI ĐÓ
router.get("/find/:id", isUser, async (req, res) => {
  try {
    const user1 = await User.findById(req.params.id);

    // Chúng ta sẽ không gửi mật khẩu
    res.status(200).send({
      _id: user1._id,
      name: user1.name,
      email: user1.email,
      isAdmin: user1.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// đổi thông tin người dùng
router.put("/:id", isUser, async (req, res) => {
  try {
    const user1 = await User.findById(req.params.id);
    // khi có mật khẩu khi người dùng muốn đổi
    if (req.body.password && user1) {
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(req.body.password, salt);
      user1.password = hashPassWord;
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: user1.email,
        isAdmin: user1.isAdmin,
        password: user1.password,
      },
      { new: true }
    );
    // Chúng ta sẽ không gửi mật khẩu
    res.status(200).send({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Tìm kiếm 1 người dùng cụ thể
module.exports = router;

/**
 * Giai đoạn $match sẽ được thực hiện trước. Nó sẽ lọc các bản ghi người dùng chỉ lấy những bản ghi có trường createdAt 
 * lớn hơn hoặc bằng ngày đầu tiên của tháng trước. Kết quả là một tập hợp các bản ghi thỏa điều kiện lọc.

Giai đoạn $project sẽ được thực hiện tiếp theo. Nó sẽ chỉ lấy trường createdAt và sử dụng phép toán $month để
 trích xuất giá trị tháng từ trường createdAt. Kết quả là một tập hợp các đối tượng chứa trường month.


 month: Đây là tên trường mới mà chúng ta muốn tạo. Trường mới này sẽ chứa thông tin về tháng của trường createdAt.

$month: Đây là một phép toán hỗ trợ trong câu truy vấn aggregate của MongoDB. Nó được sử dụng để trích xuất thông tin về tháng từ trường 
createdAt trong các tài liệu. Phép toán $month sẽ trả về một giá trị nguyên biểu thị tháng (từ 1 đến 12) từ trường ngày đã cho.

Ví dụ, nếu createdAt trong tài liệu là ngày "2023-10-15T08:00:00.000Z", thì giai đoạn $project sẽ tạo ra một trường mới là month 
với giá trị 10, tương ứng với tháng tháng 10.

Kết quả của giai đoạn $project là một tập hợp các đối tượng chứa trường month với giá trị tương ứng từ các tài liệu
 đã được xử lý trước đó trong câu truy vấn aggregate.

Cuối cùng, giai đoạn $group sẽ được thực hiện. Nó sẽ nhóm các bản ghi theo trường _id: "month", nghĩa là gom
 tất cả các đối tượng có trường month giống nhau vào một nhóm. Tiếp theo, sử dụng phép toán $sum để tính tổng
  số đối tượng trong mỗi nhóm. Điều này sẽ cho kết quả thống kê số lượng người dùng được tạo trong tháng trước, và sẽ được đặt trong trường total.
 */
