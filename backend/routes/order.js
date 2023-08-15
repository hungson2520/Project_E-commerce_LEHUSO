const { Order } = require("../models/order");
/**
 * moment là một thư viện JavaScript rất phổ biến và mạnh mẽ được sử dụng để làm việc với ngày và giờ trong JavaScript.
 * Nó cung cấp nhiều tính năng và phương thức hữu ích để định dạng, phân tích, tính toán và hiển thị các giá trị thời gian.
 */
const moment = require("moment");
const express = require("express");

const router = express.Router();

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
    const orders = await Order.aggregate([
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
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.send(500).send(error);
  }

  res.send(previousMonth);
});

router.get("/income/statistics", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("DD-MM-YYYY HH:mm:ss");
  // truy vấn aggregate trong MongoDB sử dụng trong ứng dụng Node.js để thống kê số lượng người dùng đã được tạo trong tháng trước.
  try {
    const orders = await Order.aggregate([
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
      { $project: { month: { $month: "$createdAt" }, sale: "$total" } },

      /**
       *  Stage này sử dụng $group để nhóm các bản ghi theo trường _id: "month", nghĩa là gom tất cả các đối tượng
       * có trường month giống nhau vào một nhóm. Tiếp theo, sử dụng phép toán $sum
       * để tính tổng số đối tượng trong mỗi nhóm. Điều này sẽ cho kết quả thống kê
       *  số lượng người dùng được tạo trong tháng trước, và sẽ được đặt trong trường total
       *
       */
      { $group: { _id: "$month", total: { $sum: "$sale" } } },
    ]);
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.send(500).send(error);
  }

  res.send(previousMonth);
});

// ONE WEEK SALE
// DOANH SỐ BÁN TRONG 1 TUẦN
router.get("/week-sale", async (req, res) => {
  const LastWeek = moment()
    .day(moment().day() - 7)
    .format("DD-MM-YYYY HH:mm:ss");
  // truy vấn aggregate trong MongoDB sử dụng trong ứng dụng Node.js để thống kê số lượng người dùng đã được tạo trong tháng trước.
  try {
    const orders = await Order.aggregate([
      {
        /**
         * $match để lọc dữ liệu chỉ lấy những người dùng có trường createdAt (ngày tạo) lớn hơn
         *  hoặc bằng ngày đầu tiên của tháng trước( TỨC LÀ LẤY RA THÁNG NÀY VÀ THÁNG TRƯỚC)
         * previousMonth được tính toán trước đó để biểu thị tháng trước.
         *  Kết quả là một tập hợp (array) các bản ghi người dùng thỏa điều kiện lọc.
         */
        $match: { createdAt: { $gte: new Date(LastWeek) } },
      },
      /**
       *: Stage này sử dụng $project để chỉ lấy trường createdAt
        và sử dụng phép toán $month để trích xuất giá trị tháng từ trường createdAt. Kết quả là một tập hợp các đối tượng chứa trường month.
       */
      { $project: { day: { $dayOfWeek: "$createdAt" }, sale: "$total" } },

      /**
       *  Stage này sử dụng $group để nhóm các bản ghi theo trường _id: "month", nghĩa là gom tất cả các đối tượng
       * có trường month giống nhau vào một nhóm. Tiếp theo, sử dụng phép toán $sum
       * để tính tổng số đối tượng trong mỗi nhóm. Điều này sẽ cho kết quả thống kê
       *  số lượng người dùng được tạo trong tháng trước, và sẽ được đặt trong trường total
       *
       */
      { $group: { _id: "$day", total: { $sum: "$sale" } } },
    ]);
    return res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    return res.send(500).send(error);
  }

  res.send(LastWeek);
});

/**
 * const query = req.query.new;:
 * Lấy giá trị của tham số "new" từ query string của yêu cầu. Query string là phần dữ liệu được gửi trong URL sau dấu "?", ví dụ "/?new=true".
 *
 * if (query) { ... } else { ... }: Kiểm tra nếu tham số "new" được truyền trong query string (query là true),
 * thì sẽ thực hiện truy vấn với một số tham số bổ sung (lấy 4 đơn hàng mới nhất).
 * Nếu không, sẽ thực hiện truy vấn mặc định để lấy tất cả các đơn hàng, được sắp xếp theo _id theo thứ tự giảm dần.
 *
 * LatestOrder = await Order.find().sort({ _id: -1 }).limit(4);:
 *  Truy vấn Cơ sở dữ liệu (Database Query) để lấy các đơn hàng.
 *  Hàm Order.find() sẽ trả về một danh sách các đơn hàng. .sort({ _id: -1 })
 * sắp xếp danh sách theo _id theo thứ tự giảm dần (để lấy đơn hàng mới nhất trước).
 * .limit(4) giới hạn số lượng đơn hàng trả về là 4 (chỉ khi query = true).
 */
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    let LatestOrder;
    if (query) {
      LatestOrder = await Order.find().sort({ _id: -1 }).limit(4);
    } else {
      LatestOrder = await Order.find().sort({ _id: -1 });
    }
    res.status(200).send(LatestOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Update 1 đơn hàng
//Tham số { new: true } chỉ định rằng sau khi cập nhật, hàm sẽ trả về phiên bản mới của đơn hàng đã cập nhật.
router.put("/:id", async (req, res) => {
  try {
    let updateOrder;

    updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).send(updateOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// TÌM và XEM 1 ĐƠN HÀNG CỤ THỂ
router.get("/find/:id", auth, async (req, res) => {
  try {
    let Order1;

    Order1 = await Order.findById(req.params.id);
    // chỉ có khách hàng nào mua mới xem được đơn hàng của mình đã mua thôi
    // Admin cũng có quyền xem đơn hàng mình đã mua console.log("req.user.isAdmin", req.user.isAdmin);
    if (req.user.isAdmin) {
      return res.status(200).send(Order1);
    }
    if (req.user._id == Order1.userId) {
      return res.status(200).send(Order1);
    }

    return res
      .status(403)
      .send(" Truy cập bị từ chối , bạn không có quyền  này đâu!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/findAllOrder/:id", isUser, async (req, res) => {
  try {
    let Order1;

    Order1 = await Order.find({ userId: req.params.id });
    // chỉ có khách hàng nào mua mới xem được đơn hàng của mình đã mua thôi
    // Admin cũng có quyền xem đơn hàng mình đã mua console.log("req.user.isAdmin", req.user.isAdmin);

    return res.status(200).send(Order1);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
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
